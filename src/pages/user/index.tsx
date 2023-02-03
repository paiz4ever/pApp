import { View, Text, Button } from "@tarojs/components";
import { AppInfo } from "@/config";
import "./index.scss";
import { connect } from "react-redux";
import { testNewArr } from "@/actions/user.action";
import { FC } from "react";
import Request from "@/utils/request";

const User: FC<{ testNewArr: () => void }> = ({ testNewArr }) => {
  return (
    <View className="index">
      <Text>{AppInfo.name + "个人"}</Text>
      <Button
        style={{ width: "200px", height: "100px" }}
        onClick={() => {
          Request.get("/test").then(testNewArr);
        }}
      >
        测试按钮
      </Button>
    </View>
  );
};

export default connect(
  ({ user }) => ({
    user
  }),
  (dispatch) => ({
    testNewArr() {
      dispatch<any>(testNewArr());
    }
  })
)(User);
