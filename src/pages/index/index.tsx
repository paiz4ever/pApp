import { FC } from "react";
import { View, Text, Button } from "@tarojs/components";
import { AppInfo } from "@/config";
import "./index.scss";
import { dynamRender } from "@/utils/ui/hoc";
import { showMask } from "@/utils/ui/interaction";

const Index: FC = () => {
  let t = <Text>{AppInfo.name}</Text>;
  let b = (
    <Button
      onClick={() => {
        showMask({
          autoHide: true
        });
        // Taro.navigateTo({
        //   url: "/pages/test/index"
        // })
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
