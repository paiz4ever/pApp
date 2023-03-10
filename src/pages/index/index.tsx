import { FC, useEffect } from "react";
import { View, Text, Button } from "@tarojs/components";
import { AppInfo } from "@/config";
import "./index.scss";
import { dynamRender } from "@/utils/ui/hoc";
import Taro from "@tarojs/taro";

const Index: FC = () => {
  let t = <Text>{AppInfo.name}</Text>;
  useEffect(() => {});
  let b = (
    <Button
      onClick={() => {
        Taro.navigateTo({
          url: "/pages/test/index"
        });
      }}
    >
      前往测试
    </Button>
  );
  return (
    <>
      <View>
        {t}
        {b}
      </View>
    </>
  );
};

export default dynamRender(Index);
