import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import "taro-ui/dist/style/index.scss";
import "./app.scss";
import store from "./store/redux.store";

const App: FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default App;
