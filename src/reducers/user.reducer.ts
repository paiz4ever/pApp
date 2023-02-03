import { ActionType } from "@/interface";
import UserActionType from "@/actions/user.action";

const initialState = {
  arr: [1, 2, 3]
};

const user = (state = initialState, action: ActionType<UserActionType>) => {
  switch (action.type) {
    case "TEST_CLEAN_ARR":
      return {
        ...state,
        arr: []
      };
    case "TEST_ADD_ARR":
      return {
        ...state,
        arr: [...state.arr, 99]
      };
    default:
      return state;
  }
};

export default user;
