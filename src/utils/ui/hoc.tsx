import { ComponentType, useEffect } from "react";
import { useOnce, useRefresh } from "../common/react.extension";
import { DynamRenderHanlder } from "./hoc.h";
import { getPage } from "./page";

// NOTICE 单独定义泛型 因为tsx会把<T>解析
type HOCFunc = <T>(C: ComponentType<T>) => ComponentType<T>;

/**
 * 使页面可以动态渲染节点在其上方
 */
export const dynamRender: HOCFunc = (C) => {
  return (props) => {
    const page = getPage();
    let refresh = useRefresh();
    useOnce(() => {
      page._$DRHandler = new DynamRenderHanlder(refresh);
    })
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
