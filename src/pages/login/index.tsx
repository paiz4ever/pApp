import { FC } from "react";
import { Button } from "@tarojs/components";
import "./index.scss";
import { dynamRender } from "@/utils/ui/hoc";
import MUI from "@/utils/ui/interaction";
import Taro from "@tarojs/taro";
import Request from "@/utils/common/request";
import LocalStore from "@/store/local.store";
import Bg from "@/components/common/bg";

const Login: FC = () => {
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
    <Bg safety>
      <Button style={{ width: "100px", height: "50px" }} onClick={handleLogin}>
        登录
      </Button>
    </Bg>
  );
};

export default dynamRender(Login);
