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
import { TabBarList } from "@/config";
import { connect } from "react-redux";
import { switchTabBar } from "@/actions/tabbar.action";

const TabBar: FC<{
  tabbar: number;
  switchTabBar(idx: number): void;
}> = ({ tabbar, switchTabBar }) => {
  const switchBar = (idx: number) => {
    switchTabBar(idx);
    Taro.switchTab({
      url: "/" + TabBarList[idx].pagePath
    });
  };

  return (
    <AtTabBar
      fixed
      backgroundColor="#ffffff"
      selectedColor="#d43c33"
      tabList={TabBarList.map((v) => v.tabStyle)}
      onClick={(idx) => switchBar(idx)}
      current={tabbar}
    />
  );
};

// NOTICE 自定义 TabBar 比较特殊，要编译为自定义组件给小程序调用。因此会有样式隔离。
(TabBar as any).options = {
  addGlobalClass: true
};

export default connect(
  ({ tabbar }) => ({
    tabbar
  }),
  (dispatch) => ({
    switchTabBar(idx: number) {
      dispatch(switchTabBar(idx));
    }
  })
)(TabBar);
