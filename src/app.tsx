import {
  useError,
  useLaunch,
  usePageNotFound,
  useUnhandledRejection
} from "@tarojs/taro";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import "taro-ui/dist/style/index.scss";
import "./app.scss";
import store from "./store/redux.store";

const App: FC<{ children: ReactNode }> = ({ children }) => {
  useLaunch(() => {
    // TODO 这里初始化
  });

  useError((error) => {
    // TODO 处理异常
  });

  usePageNotFound(() => {
    // TODO 页面丢失
  });

  useUnhandledRejection(() => {
    // TODO rejecet处理
  });

  return <Provider store={store}>{children}</Provider>;
};

export default App;
