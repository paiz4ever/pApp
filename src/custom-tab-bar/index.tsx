/**
 * 全局自定义tabbar
 * 存在众多细节 参照文档
 * https://docs.taro.zone/docs/custom-tabbar
 * https://github.com/NervJS/taro/issues/7302
 * 这里采用不是上述的在每个tab页中添加代码 使用全局状态
 * // NOTICE 所有的tab页在切换时不触发unMount操作 使用onHide
 */

import { FC } from "react";
import { AtTabBar } from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/index.scss";
import { TabItem } from "taro-ui/types/tab-bar";

export const tabBarList: { tabStyle: TabItem; pagePath: string }[] = [
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

// TODO 使用redux
let currentIdx = 0;
const TabBar: FC = () => {
  const switchBar = (idx: number) => {
    currentIdx = idx;
    Taro.switchTab({
      url: "/" + tabBarList[idx].pagePath
    });
  };

  return (
    <AtTabBar
      fixed
      backgroundColor="#ffffff"
      selectedColor="#d43c33"
      tabList={tabBarList.map((v) => v.tabStyle)}
      onClick={(idx) => switchBar(idx)}
      current={currentIdx}
    />
  );
};

// NOTICE 自定义 TabBar 比较特殊，要编译为自定义组件给小程序调用。因此会有样式隔离。
(TabBar as any).options = {
  addGlobalClass: true
};

export default TabBar;