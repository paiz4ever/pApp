/**
 * // TODO 在taro中有相关的hook 替换之
 */

import { useEffect, useRef, useState } from "react"

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
 * 刷新
 */
export const useRefresh = () => {
    let [_, refresh] = useState({});
    return () => {
        refresh({});
    }
}

/**
 * 异步刷新（通过该行为导致的刷新）
 * // TODO 取消订阅
 * // CONFUSED 在taro hooks文档中 useEffect
 * 请确保数组中包含了所有外部作用域中会发生变化且在 effect 中使用的变量
 * 否则你的代码会引用到先前渲染中的旧变量
 * 但这里o经过测试是可以拿到最新值的
 */
export const useRefreshAsync = (): () => Promise<void> => {
    let [isok, refresh] = useState({});
    // 这里使用ref而不是state 在o.current = {}处可以减少一次渲染
    let o = useRef<{ fn?: () => void }>({});
    useEffect(() => {
        if (o.current.fn) {

            try {
                o.current.fn();
                o.current = {};
            } catch (_) { }
        }
    }, [isok]);
    return () => new Promise(resolve => {
        o.current.fn = resolve;
        refresh({});
        // NOTICE 此处isok为boolean时 每一次函数组件进入时由于都返回的新函数 导致之前的rfn内部是旧的isok（闭包）
        // 所以除非外部主动更新所使用的rfn方法 否则不推荐boolean
        // refresh(!isok);
        // NOTICE 虽然解决了上述问题 但同步调用两次rfn会让boolean复原导致无法刷新 所以依旧不推荐
        // refresh((isok) => !isok)
    })
}