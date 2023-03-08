/**
 * http通信相关接口
 */

import { BaseUrl } from "@/config";
import { HttpStatusCode } from "@/constants";
import { IRequestTask, IUploadTask } from "@/interface/redefine";
import LocalStore from "@/store/local.store";
import Taro from "@tarojs/taro";

type RequestParam = Omit<
  Taro.request.Option,
  "success" | "fail" | "complete" | "method"
>;

interface IResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export default class Request {
  private static inited = false;
  private static token: string;
  // TODO 这是一个loading优化项 用作不在每次请求时直接showLoading（但相应需要配套一个mask）
  private static loadingTimer: NodeJS.Timer | null;
  /**
   * GET请求
   */
  static get<T = any>(url: string) {
    return this.custom<T>({ url }, "GET");
  }
  /**
   * POST请求
   */
  static post<T = any>(url: string, data?: any) {
    return this.custom<T>({ url, data }, "POST");
  }
  /**
   * 上传
   */
  static upload<T = any>(url: string, filePath: string, data?: any): IUploadTask<T> {
    const apiUrl = BaseUrl + url;
    this.loading("上传中")
    let task = Taro.uploadFile({
      url: apiUrl,
      filePath,
      name: "file",
      formData: data,
      header: {
        token: this.token || ""
      },
      withCredentials: false
    });
    let ntask = task
      .then((res) => {
        this.endLoading();
        if (res.statusCode !== HttpStatusCode.SUCCESS) {
          return Promise.reject(res);
        }
        console.log(res)
        let data = JSON.parse(res.data) as IResponse;
        if (data.code !== HttpStatusCode.SUCCESS) {
          return Promise.reject({ statusCode: data.code, errMsg: data.message });
        }
        return data.data;
      })
      .catch((err) => {
        this.endLoading();
        this.showError(err, "上传失败");
        return Promise.reject(err);
      }) as unknown as IUploadTask<T>;
    ntask.abort = task.abort;
    ntask.onProgressUpdate = task.onProgressUpdate;
    return ntask;
  }


  /**
   * 自定义请求
   */
  static custom<T = any>(param: RequestParam, method: keyof Taro.request.Method): IRequestTask<T> {
    // 初始化拦截器
    if (!this.inited) {
      Taro.addInterceptor(Taro.interceptors.logInterceptor);
      this.token = LocalStore.get("@TOKEN")
      // Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);
      this.inited = true;
    }
    const { url } = param;
    const apiUrl = BaseUrl + url;
    this.loading();
    let task = Taro.request<IResponse>({
      ...param,
      url: apiUrl,
      method,
      data: {
        ...param.data,
        // NOTICE 加上时间戳避免disk cache
        timestamp: new Date().getTime(),
      },
      header: {
        token: this.token || ""
      }
      // NOTICE 使用超时拦截器时此字段需要赋值 默认值没有生效
      // timeout: 3000
    });
    let ntask = task
      .then((res) => {
        this.endLoading();
        if (res.statusCode !== HttpStatusCode.SUCCESS) {
          return Promise.reject(res);
        }
        if (res.data.code !== HttpStatusCode.SUCCESS) {
          return Promise.reject({ statusCode: res.data.code, errMsg: res.data.message });
        }
        let token = res.data.data.token;
        if (token) {
          this.token = token;
          LocalStore.set("@TOKEN", token);
        }
        return res.data.data;
      })
      .catch((err) => {
        this.endLoading();
        this.showError(err, "请求错误");
        // CONFUSED 返回一个pending状态的promise 这样外部就无需处理异常 但是否会导致内存泄漏
        // return new Promise(() => {});
        return Promise.reject(err);
      }) as unknown as IRequestTask<T>;
    ntask.abort = task.abort;
    // NOTICE 不直接返回链式的promise 因为task对象还拥有其他方法 比如abort
    return ntask;
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

  private static showError({ statusCode, errMsg }, title?: string) {
    title = title || "错误";
    if (statusCode) {
      title += " code: " + statusCode
    }
    Taro.showToast({
      title,
      icon: "none",
      duration: 2000
    });
    // TODO 日志上报 errMsg
  }
}
