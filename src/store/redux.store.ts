import tabbar from "@/reducers/tabbar.reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "@/reducers/user.reducer";

// 默认配置了thunk中间件
const store = configureStore({
  reducer: combineReducers({
    tabbar,
    user
  }),
});

export default store;
