import { ActionType } from "@/constants";
import TabBarActionType from "@/actions/tabbar.action";

const initialState = 0;

const tabbar = (
  state = initialState,
  action: ActionType<TabBarActionType>
) => {
  switch (action.type) {
    case "SWITCH_TABBAR":
      return action.payload;
    default:
      return state;
  }
};

export default tabbar;
