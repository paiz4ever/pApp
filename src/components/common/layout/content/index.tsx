import { CSSProperties, FC } from "react";
import { StandardProps, View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";

const Content: FC<IContentProps> = ({ style, children, banFlex, ...other }) => {
  let { bottom } = Taro.getMenuButtonBoundingClientRect();
  let top = bottom + 10;
  let { screenHeight } = Taro.getWindowInfo();
  return (
    <View
      className={banFlex ? "fullw" : "fullw flex"}
      style={{
        top: `${top}px`,
        height: `${screenHeight - top}px`,
        ...(style as CSSProperties)
      }}
      {...other}
    >
      {children}
    </View>
  );
};

export interface IContentProps extends StandardProps {
  banFlex?: true;
}

export default Content;
