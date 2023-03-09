import { FC } from "react";
import { View, Text } from "@tarojs/components";
import { AppInfo } from "@/config";
import "./index.scss";

const Test: FC = () => {
  return (
    <View>
      <Text>{AppInfo.name + "测试"}</Text>
    </View>
  );
};

export default Test;
