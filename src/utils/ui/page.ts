import { ICustomPage } from "@/interface/page";
import Taro from "@tarojs/taro"

export const getPage = (): ICustomPage => {
    return Taro.getCurrentPages().pop();
}

export const getDRPage = (): ICustomPage => {
    let page = getPage();
    if (!page._$DRHandler) {
        return null;
    }
    return page;
}