/**
 * TODO 在taro中有相关的hook 替换之
 */

import { useRef, useState } from "react"

/**
 * 模拟的类组件的constructor时机
 */
export const useOnce = (cb: () => void) => {
    const once = useRef(false);
    if (!once.current) {
        cb();
    }
    once.current = true;
}

/**
 * 生成刷新方法
 */
export const useRefresh = () => {
    let [_, refresh] = useState({});
    return () => {
        refresh({});
    }
}