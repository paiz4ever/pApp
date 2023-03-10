import { FC } from "react";
import { View, Text, Button } from "@tarojs/components";
import { AppInfo } from "@/config";
import "./index.scss";
import {
  usePageScroll,
  usePullDownRefresh,
  useReachBottom
} from "@tarojs/taro";

const Test: FC = () => {
  useReachBottom(() => {});

  usePullDownRefresh(() => {});

  usePageScroll((res) => {});

  return (
    <View>
      <Text>{AppInfo.name + "测试"}</Text>
      <Button>按钮</Button>
      <View style={{ height: "500px", backgroundColor: "red" }}></View>
      <View style={{ height: "500px", backgroundColor: "#000" }}></View>
      <View style={{ height: "500px", backgroundColor: "red" }}></View>
    </View>
  );
};

export default Test;
