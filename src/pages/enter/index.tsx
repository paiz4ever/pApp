import { FC } from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import LocalStore from "@/store/local.store";
import Bg from "@/components/common/bg";
import { Button } from "@nutui/nutui-react-taro";
import { custom } from "@/utils/ui/hoc";

const Enter: FC = () => {
  const enter = () => {
    Taro.checkSession()
      .then(() => {
        if (!LocalStore.get("@TOKEN")) {
          console.log("未授权");
          return Promise.reject();
        }
        Taro.reLaunch({
          url: "/pages/index/index"
        });
      })
      .catch(() => {
        console.log("未登录");
        LocalStore.remove("@TOKEN");
        Taro.reLaunch({
          url: "/pages/login/index"
        });
      });
  };

  return (
    <Bg safety>
      <View className="pa title0 flex">
        <Text className="pa title1">至尚</Text>
        <Text className="pa title2">Welcome To ZHIS</Text>
      </View>
      <Text className="pa content">
        享受生活享受生活享受生活享受生活享受生活受生活享受生活享受生活享受生活享受生活享受生活享受生活享受生活享受生活享受生活享受生活享受生活享受生活享受生活享受生活享受生活享受生活
      </Text>

      <Button className="btn" onClick={enter} type="primary">
        进入小店
      </Button>
    </Bg>
  );
};

export default custom(Enter);
