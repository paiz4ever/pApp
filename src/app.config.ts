// NOTICE 导入的文件不能去import其他文件 否则编译失败
import { TabBarList } from "./config";

// (window as any).__taroAppConfig可以获取该配置
/**
 * // NOTICE defineAppConfig & definePageConfig 是宏函数，它主要用于「类型提示」和「自动补全」。
 * 在编译时会提取config部分生成单独的 配置 文件，它并不是运行时可用的函数。
 */
export default defineAppConfig({
  debug: false,
  tabBar: {
    list: TabBarList.map((v) => ({
      pagePath: v.pagePath,
      text: v.tabStyle.title
    })),
    custom: true
  },
  pages: ["pages/index/index", "pages/user/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  }, 
  lazyCodeLoading: "requiredComponents",
  permission: {
    "scope.userLocation": { 
      "desc": "你的位置信息将用于..."
    }
  },
  requiredPrivateInfos: [
    "getLocation"
  ]
});
