import Taro, {
  useError,
  useLaunch,
  usePageNotFound,
  useUnhandledRejection
} from "@tarojs/taro";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import "./app.scss";
import { BaseUrl } from "./config";
import store from "./store/redux.store";

const App: FC<{ children: ReactNode }> = ({ children }) => {
  useLaunch(() => {
    // TODO 这里初始化
    loadFont();
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

  // 加载字体
  const loadFont = () => {
    // 仅从后端加载一次 之后从本地加载
    Taro.loadFontFace({
      global: true,
      family: "STXINWEI",
      source: `url("${BaseUrl}/assets/font/STXINWEI.ttf")`
    });
  };

  return <Provider store={store}>{children}</Provider>;
};

export default App;
