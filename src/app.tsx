import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import "taro-ui/dist/style/index.scss";
import "./app.scss";

const store = configureStore({
  reducer: combineReducers({})
});

const App: FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default App;
