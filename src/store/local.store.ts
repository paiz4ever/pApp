import { LocalStoreKey } from "@/constants/store";
import Taro from "@tarojs/taro";

export default class LocalStore {
    /**
     * 获取本地缓存
     */
    static get(key: LocalStoreKey) {
        try {
            return Taro.getStorageSync(key);
        } catch (_) { }
    }
    /**
     * 设置本地缓存
     */
    static set(key: LocalStoreKey, data: any) {
        try {
            return Taro.setStorageSync(key, data);
        } catch (_) { }
    }
    /**
     * 移除本地缓存
     */
    static remove(key: LocalStoreKey) {
        try {
            return Taro.removeStorageSync(key);
        } catch (_) { }
    }
    /**
     * 清空本地缓存
     */
    static clear() {
        try {
            return Taro.clearStorageSync();
        } catch (_) { }
    }
}