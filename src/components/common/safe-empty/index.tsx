import { CSSProperties, FC } from "react";
import { StandardProps, View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";

const SafeEmpty: FC<ISafeEmptyProps> = ({
  offset,
  style,
  className,
  ...other
}) => {
  let width = (style as CSSProperties)?.width || "100%";
  let { statusBarHeight } = Taro.getWindowInfo();
  let height = `${Math.max(statusBarHeight - (offset || 0), 0)}px`;

  return (
    <View
      style={{
        width,
        height,
        ...(style as CSSProperties)
      }}
      className={className}
      {...other}
    ></View>
  );
};

export interface ISafeEmptyProps extends StandardProps {
  offset?: number;
}

export default SafeEmpty;
