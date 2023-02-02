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

export const AppInfo = {
  name: "至尚"
};
