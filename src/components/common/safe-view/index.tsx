import { CSSProperties, FC } from "react";
import { StandardProps, View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import classNames from "classnames";

const SafeView: FC<ISafeViewProps> = ({
  normal,
  children,
  style,
  className,
  ...other
}) => {
  let width = (style as CSSProperties)?.width || "100%";
  let height = (style as CSSProperties)?.height || "100%";
  let top = 0;
  if (!normal) {
    let { screenHeight, statusBarHeight } = Taro.getWindowInfo();
    height = `${screenHeight - statusBarHeight}px`;
    top = statusBarHeight;
  }
  let cls = classNames("pa", className);

  return (
    <View
      style={{
        width,
        height,
        top: `${top}px`,
        ...(style as CSSProperties)
      }}
      className={cls}
      {...other}
    >
      {children}
    </View>
  );
};

export interface ISafeViewProps extends StandardProps {
  normal?: boolean;
}

export default SafeView;
