import { createAction } from ".";

const ACTIONS = {
  // 切换tab栏
  SWITCH_TABBAR: "SWITCH_TABBAR"
};
type TabBarActionType = typeof ACTIONS;
export default TabBarActionType;

export const switchTabBar = (idx: number) => {
  return createAction<TabBarActionType>("SWITCH_TABBAR", idx);
};
