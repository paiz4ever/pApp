import { CSSProperties, FC } from "react";
import { StandardProps, View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import classNames from "classnames";

const Bar: FC<IBarProps> = ({
  style,
  children,
  banFlex,
  className,
  ...other
}) => {
  let { top, height } = Taro.getMenuButtonBoundingClientRect();
  let cls = classNames(
    "fullw",
    {
      flex: !banFlex
    },
    className
  );

  return (
    <View
      className={cls}
      style={{
        height: `${height}px`,
        top: `${top}px`,
        ...(style as CSSProperties)
      }}
      {...other}
    >
      {children}
    </View>
  );
};

export interface IBarProps extends StandardProps {
  banFlex?: true;
}

export default Bar;
