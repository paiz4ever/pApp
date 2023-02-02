import tabbar from "@/reducers/tabbar.reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: combineReducers({
    tabbar
  })
});

export default store;
