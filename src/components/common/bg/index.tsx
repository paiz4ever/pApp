import { CSSProperties, FC } from "react";
import { Image, StandardProps, View } from "@tarojs/components";
import "./index.scss";
import bg from "@/assets/image/bg/bg_enter.jpg";
import SafeView from "../safe-view";
import classNames from "classnames";

const Bg: FC<IBgProps> = ({
  image,
  children,
  style,
  banFlex,
  safety,
  className,
  ...other
}) => {
  if (!image) {
    image = bg;
  }
  let cls = classNames(
    "pa",
    {
      flex: !banFlex
    },
    className
  );

  return (
    <View className="full flex">
      <Image src={image} className="full" mode="aspectFill"></Image>
      <View className="mask"></View>
      <SafeView
        normal={!safety}
        style={{
          width: "100%",
          ...(style as CSSProperties)
        }}
        className={cls}
        {...other}
      >
        {children}
      </SafeView>
    </View>
  );
};

export interface IBgProps extends StandardProps {
  image?: string;
  banFlex?: true;
  safety?: true;
}

export default Bg;
