import { tabBarList } from "./custom-tab-bar";

export default defineAppConfig({
  debug: false,
  tabBar: {
    list: tabBarList.map((v) => ({
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
  }
});
