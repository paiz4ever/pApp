import { Text, Button, ScrollView, Input } from "@tarojs/components";
import { AppInfo } from "@/config";
import "./index.scss";
import { connect } from "react-redux";
import { testNewArr } from "@/actions/user.action";
import { FC, useRef, useState } from "react";
import Request from "@/utils/common/request";
import Taro, { usePageScroll, usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import LocalStore from "@/store/local.store";
import { AtAvatar } from "taro-ui";

const User: FC<{ testNewArr: () => void }> = ({ testNewArr }) => {
  let switchf = false;
  let data = {
    avatar: "",
    gender: 2,
    nickname: ""
  };
  let [img, setImage] = useState("");
  let [val, setVal] = useState("000");
  let [ntask, setNtask] = useState<any>();
  let ref = useRef<any>();
  let ref1 = useRef<any>();
  let task: Taro.SocketTask;

  const switchContent = (cb1: Function, cb2: Function) => {
    if (switchf) {
      cb1();
    } else {
      cb2();
    }
    switchf = !switchf;
  };
  let { safeArea } = Taro.getSystemInfoSync() as any;
  let head;
  if (img) {
    head = (
      <AtAvatar
        customStyle={{ backgroundColor: "#000000" }}
        text="花轰"
      ></AtAvatar>
    );
  }
  return (
    <ScrollView scrollY style={{ height: `${safeArea.height - 110}px` }} refresherEnabled>
      <Text>{AppInfo.name + "个人"}</Text>
      <Button
        style={{ width: "200px", height: "100px" }}
        onClick={() => {
          Taro.login().then((r) => {
            console.log("登录", r);
            Request.post("/csm/login", {
              code: r.code
            })
              .then((r) => {
                LocalStore.set("@OPENID", r.openid);
                console.log("====", r);
              })
              .catch((e) => {
                console.log("++++", e);
              });
          });
        }}
      >
        登录测试按钮
      </Button>
      <Button
        style={{ width: "200px", height: "100px" }}
        onClick={() => {
          // NOTICE 权限的scope需要在app.config.ts中配置
          Taro.authorize({
            scope: "scope.userLocation",
            success(res) {
              console.log("授权测试", res);
            },
            fail() {
              Taro.showModal({
                title: "前往设置",
                content:
                  "由于你取消授权，这将导致你无法正常使用该功能，是否前往开启权限",
                cancelText: "取消",
                confirmText: "确认",
                success(result) {
                  if (result.confirm) {
                    // 申请过的授权会在设置中展示
                    Taro.openSetting();
                  }
                }
              });
            }
          });
        }}
      >
        授权测试按钮
      </Button>

      <Button
        style={{ width: "200px", height: "100px" }}
        onClick={() => {
          Taro.getLocation({
            type: "wgs84",
            success: function (res) {
              console.log("获取位置", res);
            },
            fail() {
              Taro.showModal({
                title: "前往设置",
                content:
                  "由于你取消授权，这将导致你无法正常使用该功能，是否前往开启权限",
                cancelText: "取消",
                confirmText: "确认",
                success(result) {
                  if (result.confirm) {
                    Taro.openSetting();
                  }
                }
              });
            }
          });
        }}
      >
        获取位置（带授权）
      </Button>

      <Button
        style={{ width: "200px", height: "100px" }}
        onClick={() => {
          Taro.checkSession({
            success: function () {
              console.log("有效");
            },
            fail: function () {
              console.log("无效");
            }
          });
        }}
      >
        验证session测试按钮
      </Button>
      {/* <AtBadge value={10} maxValue={99}></AtBadge> */}
      <Button
        style={{ width: "200px", height: "100px" }}
        openType="getPhoneNumber"
        onGetPhoneNumber={(e) => {
          console.log(e.detail);
          let openid = LocalStore.get("@OPENID");
          Request.post("/csm/bindphone", {
            openid,
            code: e.detail.code
          }).then((r) => {
            console.log("====", r);
          });
        }}
        onError={(e) => {
          console.log("errr", e);
        }}
      >
        获取手机号
      </Button>

      <Button
        style={{ width: "200px", height: "100px" }}
        onClick={() => {
          // Taro.hideLoading();
          // return;
          // console.log("环境", Taro.getEnv(), (window as any).wx, Taro.ENV_TYPE);
          // console.log(Taro.getCurrentPages())
          // console.log(Taro.canIUse("getLocation"), Taro.canIUse("getLocationFake"))
          // Taro.openSystemBluetoothSetting({
          //   success(res){
          //     console.log("+++", res);
          //   }
          // });
          // Taro.openAppAuthorizeSetting({
          //   success(res) {
          //     console.log("+++", res);
          //   }
          // });
          // console.log(Taro.getWindowInfo());
          // console.log(Taro.getSystemSetting());
          // console.log(Taro.getSystemInfoSync());
          // Taro.updateWeChatApp({
          //   success(res) {
          //     console.log("+++", res);
          //   }
          // });
          // console.log(Taro.getLaunchOptionsSync());
          // console.log(Taro.getEnterOptionsSync());
          // Taro.onUnhandledRejection((r) => {
          //   console.log("++++", r);
          // })
          // Taro.onError((r) => {
          //   console.log("====", r);
          // })
          // Taro.setEnableDebug({
          //   enableDebug: false
          // })
          // Taro.exitMiniProgram();
          // if (switchf) {
          //   Taro.hideShareMenu({});
          // } else {
          //   Taro.showShareMenu({
          //     withShareTicket: true
          //   });
          // }
          // Taro.showNavigationBarLoading();
          // const mapCtx = Taro.createMapContext("myMap");
          // Taro.previewMedia({
          //   sources: [
          //     {
          //       url: "https://img.tukuppt.com/photo-big/00/00/94/6152bc0ce6e5d805.jpg"
          //     }
          //   ]
          // });
          // Taro.downloadFile({
          //   url: "https://img.tukuppt.com/photo-big/00/00/94/6152bc0ce6e5d805.jpg",
          //   success(r) {
          //     if (r.statusCode === 200) {
          //       // 下载图片保存
          //       // Taro.saveImageToPhotosAlbum({
          //       //   filePath: r.tempFilePath,
          //       //   success() {
          //       //     Taro.showToast({
          //       //       title: "保存成功"
          //       //     });
          //       //   },
          //       //   fail(res) {
          //       //     console.log("保存失败", res);
          //       //   }
          //       // });
          //       // 编辑图片并保存
          //       Taro.editImage({
          //         src: r.tempFilePath,
          //         success(result) {
          //           Taro.saveImageToPhotosAlbum({
          //             filePath: result.tempFilePath,
          //             success() {
          //               Taro.showToast({
          //                 title: "保存成功"
          //               });
          //             }
          //           });
          //         }
          //       });
          //     }
          //   }
          // });
          // Taro.chooseImage({
          //   count: 2
          // })
          // Taro.getUserProfile({
          //   desc: "获取头像昵称"
          // }).then((r) => {
          //   console.log("++++", r);
          // });
          // console.log(Taro.getSystemInfoSync());
          // switchContent(() => {
          //   console.log("设置")
          //   LocalStore.set("1111", "111");
          // },() => {
          //   console.log("+++++++++", LocalStore.get("1111"))
          // })
        }}
      >
        测试各种功能
      </Button>

      <Button
        style={{ width: "200px", height: "100px" }}
        openType="chooseAvatar"
        onChooseAvatar={(e) => {
          // console.log(e.detail);
          // setImage(e.detail.avatarUrl);
          // return;
          let t = Request.upload("/csm/upload", e.detail.avatarUrl, {
            aaa: {
              c: "888"
            },
            bbb: "bbb"
          });
          t.onProgressUpdate((r) => {
            console.log(
              "==上传中==",
              r.progress,
              r.totalBytesExpectedToSend,
              r.totalBytesSent
            );
          });
          t.then((r) => {
            console.log("===上传成功==", r);
          }).catch((e) => {
            console.log("===上传失败===", e);
          });
        }}
        onError={(e) => {
          console.log("errr", e);
        }}
      >
        获取头像
      </Button>

      <Input
        id="nickname-input"
        ref={ref}
        type="nickname"
        placeholder="请输入昵称"
        onInput={(e) => {
          console.log("++++", e.detail);
          data.nickname = e.detail.value;
        }}
      ></Input>
      <Button
        style={{ width: "200px", height: "100px" }}
        onClick={() => {
          Taro.createSelectorQuery()
            .select("#nickname-input")
            .fields({
              properties: ["value"]
            })
            .exec((r) => {
              data.nickname = r[0].value;
              Request.post("/csm/editinfo", data).then((r) => {
                console.log(r);
              });
            });
        }}
      >
        编辑资料
      </Button>
      {head}
      <Button
        style={{ width: "200px", height: "100px" }}
        onClick={() => {
          Taro.connectSocket({
            url: "ws://localhost:8088/csm/socket/chat",
            header: {
              token: LocalStore.get("@TOKEN")
            },
            success: function () {
              console.log("connect success");
            }
          }).then((t) => {
            setNtask(t);
            task = t;
            task.onOpen(function () {
              console.log("onOpen");
              task.send({ data: "xxx" });
            });
            task.onMessage((r) => {
              console.log("==收到==", r);
            });
          });
        }}
      >
        进入聊天室
      </Button>
      <Input
        type="text"
        value={val}
        onInput={(e) => {
          setVal(e.detail.value);
        }}
      ></Input>
      <Button
        style={{ width: "200px", height: "100px" }}
        onClick={() => {
          if (!ntask) return;
          ntask.send({
            data: val
          });
          setVal("");
        }}
      >
        发送
      </Button>
      <Button
        style={{ width: "200px", height: "100px" }}
        onClick={() => {
          if (!ntask) return;
          ntask.close({});
          setNtask(null);
        }}
      >
        退出聊天室
      </Button>
    </ScrollView>
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
