/**
 * http通信相关接口
 */

import { BaseUrl } from "@/config";
import { HttpStatusCode } from "@/constants";
import Taro from "@tarojs/taro";

type RequestParam = Omit<
  Taro.request.Option,
  "success" | "fail" | "complete" | "method"
>;

export default class Request {
  private static interceptorsInited = false;
  // TODO 这是一个loading优化项 用作不在每次请求时直接showLoading（但相应需要配套一个mask）
  private static loadingTimer: NodeJS.Timer | null;
  /**
   * GET请求
   */
  static get(url: string) {
    return this.custom({ url }, "GET");
  }
  /**
   * POST请求
   */
  static post(url: string, data?: any) {
    return this.custom({ url, data }, "POST");
  }
  /**
   * 自定义请求
   */
  static custom(param: RequestParam, method: keyof Taro.request.Method) {
    // 初始化拦截器
    if (!this.interceptorsInited) {
      Taro.addInterceptor(Taro.interceptors.logInterceptor);
      // Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);
      this.interceptorsInited = true;
    }
    const { url } = param;
    const apiUrl = BaseUrl + url;
    this.loading();
    let task = Taro.request({
      ...param,
      url: apiUrl,
      method,
      data: {
        ...param.data,
        // NOTICE 加上时间戳避免disk cache
        timestamp: new Date().getTime(),
      }
      // NOTICE 使用超时拦截器时此字段需要赋值 默认值没有生效
      // timeout: 3000
    });
    task
      .then((res) => {
        this.endLoading();
        if (res.statusCode !== HttpStatusCode.SUCCESS) {
          return Promise.reject(res);
        }
        // TODO
        if (res.cookies && res.cookies.length > 0) {
          Taro.setStorageSync("cookies", res.cookies.join(""));
        }
        return res.data;
      })
      .catch((err) => {
        this.endLoading();
        this.showError(err);
        // CONFUSED 返回一个pending状态的promise 这样外部就无需处理异常 但是否会导致内存泄漏
        // return new Promise(() => {});
        return Promise.reject(err);
      });
    // NOTICE 不直接返回链式的promise 因为task对象还拥有其他方法 比如abort
    return task;
  }

  private static loading(title?: string) {
    this.endLoading();
    Taro.showLoading({
      title: title || "加载中",
      mask: true
    });
    // this.loadingTimer = setTimeout(() => {
    //   Taro.showLoading({
    //     title: title || "加载中",
    //     mask: true
    //   });
    // }, 800);
  }

  private static endLoading() {
    // if (!this.loadingTimer) return;
    // clearTimeout(this.loadingTimer);
    // this.loadingTimer = null;
    Taro.hideLoading();
  }

  private static showError({ statusCode, errMsg }) {
    let title = "请求错误";
    if (statusCode) {
      title += "状态: " + statusCode
    }
    Taro.showToast({
      title,
      icon: "none",
      duration: 2000
    });
    // TODO 日志上报 errMsg
  }
}
