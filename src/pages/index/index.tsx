import { FC } from "react";
import { View, Text } from "@tarojs/components";
import { AppInfo } from "@/config";
import "./index.scss";

const Index: FC = () => {
  return (
    <View>
      <Text>{AppInfo.name + "首页"}</Text>
    </View>
  );
};

export default Index;
