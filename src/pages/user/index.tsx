import { View, Text } from "@tarojs/components";
import { AppInfo } from "@/config";
import "./index.scss";

const User = () => {
  return (
    <View className="index">
      <Text>{AppInfo.name + "个人"}</Text>
    </View>
  );
};

export default User;
