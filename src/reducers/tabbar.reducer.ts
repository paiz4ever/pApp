import { IActionType } from "@/interface/redux";
import TabBarActionType from "@/actions/tabbar.action";

const initialState = 0;

const tabbar = (state = initialState, action: IActionType<TabBarActionType>) => {
  switch (action.type) {
    case "SWITCH_TABBAR":
      return action.payload as number;
    default:
      return state;
  }
};

export default tabbar;
