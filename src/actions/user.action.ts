import { createAction } from ".";

const ACTIONS = {
  // TEMP
  TEST_CLEAN_ARR: "TEST_CLEAN_ARR",
  TEST_ADD_ARR: "TEST_ADD_ARR"
};
type UserActionType = typeof ACTIONS;
export default UserActionType;

const _ = createAction<UserActionType>;

export const testNewArr = () => {
  return (dispatch) => {
    dispatch(_("TEST_CLEAN_ARR"));
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(void 0);
      }, 2000);
    }).then(() => {
      dispatch(_("TEST_ADD_ARR"));
    });
  };
};
