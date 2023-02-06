import { ActionType } from "@/interface";
import TabBarActionType from "@/actions/tabbar.action";

const initialState = 0;

const tabbar = (state = initialState, action: ActionType<TabBarActionType>) => {
  switch (action.type) {
    case "SWITCH_TABBAR":
      return action.payload as number;
    default:
      return state;
  }
};

export default tabbar;
