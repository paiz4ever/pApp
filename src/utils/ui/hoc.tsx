import { AppInfo } from "@/config";
import { ConfigProvider } from "@nutui/nutui-react-taro";
import { ComponentType, useEffect } from "react";
import { useOnce, useRefreshAsync } from "../common/react.extension";
import { DynamRenderHanlder } from "./hoc.h";
import { getPage } from "./page";
// import en from "@nutui/nutui-react-taro/dist/locales/en-US";

// NOTICE 单独定义泛型 因为tsx会把<T>解析
type HOCFunc = <T>(C: ComponentType<T>) => ComponentType<T>;

/**
 * 使页面可以动态渲染节点在其上方
 */
export const dynamRender: HOCFunc = (C) => {
  return (props) => {
    const page = getPage();
    /**
     * // NOTICE 每次调用useRefreshCallBack会产生新的rfn（因此初始化一次后每次要调DynamRenderHanlder.setRfn）
     * 第二种解决方案是将useRefreshCallBack中 refresh(!isok)写成refresh((isok) => !isok) 但如果同时调用多次refresh（重复弹组件）则没有变化
     * 针对上述第二种的弊端 解决方案是使用useState({}) 而不是boolean（此方案被采用）
     */
    let rfn = useRefreshAsync();
    useOnce(() => {
      page._$DRHandler = new DynamRenderHanlder(rfn);
    });
    useEffect(() => {
      return () => {
        page._$DRHandler.destroy();
        delete page._$dynamRenderData;
      };
    }, []);
    return (
      <>
        <C {...props}></C>
        {page._$DRHandler.getFrontNode()}
      </>
    );
  };
};

/**
 * 自定义主题和语言
 */
export const custom: HOCFunc = (C) => {
  let { deepColor } = AppInfo.theme;
  return (props) => {
    return (
      <ConfigProvider
        // locale={en}
        theme={{
          nutuiBrandColor: deepColor,
          nutuiBrandColorStart: deepColor,
          nutuiBrandColorEnd: deepColor
        }}
      >
        <C {...props}></C>
      </ConfigProvider>
    );
  };
};
