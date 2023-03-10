import { FC, useEffect } from "react";
import { View, Button } from "@tarojs/components";
import "./index.scss";
import { dynamRender } from "@/utils/ui/hoc";
import MUI from "@/utils/ui/interaction";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import Request from "@/utils/common/request";
import LocalStore from "@/store/local.store";

const Login: FC = () => {
  useLoad(() => {});

  useDidShow(() => {});

  useEffect(() => {});

  const handleLogin = () => {
    Taro.login().then((r) => {
      Request.post("/csm/login", {
        code: r.code
      }).then((r) => {
        LocalStore.set("@OPENID", r.openid);
        MUI.showToast({
          text: "登录成功",
          status: "success",
          duration: 1000
        }).then(() => {
          Taro.reLaunch({
            url: "/pages/index/index"
          });
        });
      });
    });
  };

  return (
    <View className="fl fx">
      <Button style={{ width: "100px", height: "50px" }} onClick={handleLogin}>
        登录
      </Button>
    </View>
  );
};

export default dynamRender(Login);
