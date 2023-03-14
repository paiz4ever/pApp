// 服务器地址
export const BaseUrl = "http://192.168.34.226:8088";

// qpp信息
export const AppInfo = {
  name: "至尚",
  theme: {
    deepColor: "#997B60",
    lightColor: "#C0A286"
  }
};

// 自定义底部导航
export const TabBarList: {
  tabStyle: {
    title: string;
    iconType: string;
  };
  pagePath: string;
}[] = [
  {
    tabStyle: {
      title: "首页",
      iconType: "home"
    },
    pagePath: "pages/index/index"
  },
  {
    tabStyle: {
      title: "我的",
      iconType: "user"
    },
    pagePath: "pages/user/index"
  }
];