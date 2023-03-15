import { FC, useEffect } from "react";
import { View } from "@tarojs/components";
import "./index.scss";
import MUI from "@/utils/ui/interaction";

const Mask: FC<IMaskProps> = ({ autoHide }) => {
  useEffect(() => {
    if (autoHide) {
      let sec = 2000;
      if (typeof autoHide === "number") {
        if (autoHide > 0) {
          sec = autoHide;
        }
      }
      setTimeout(() => {
        MUI.hideMask();
      }, sec);
    }
  }, []);

  return <View className="mask"></View>;
};

export interface IMaskProps {
  autoHide?: true | number; // 自动隐藏（时间/ms）
}

export default Mask;
