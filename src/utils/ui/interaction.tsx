import Mask, { IMaskProps } from "@/components/interaction/mask";
import { MOmit } from "@/interface";
import Taro from "@tarojs/taro";
import { AtMessage, AtToast } from "taro-ui";
import { AtToastProps } from "taro-ui/types/toast";
import { getDRPage } from "./page";

namespace MUI {
  /**
   * 显示遮罩
   */
  export const showMask = (props?: IMaskProps) => {
    let page = getDRPage();
    if (!page) return;
    page._$DRHandler.renderOnFront(<Mask {...props} />);
  };

  /**
   * 隐藏遮罩
   */
  export const hideMask = () => {
    let page = getDRPage();
    if (!page) return;
    page._$DRHandler.detachOnFront();
  };

  /**
   * 显示提示框
   */
  export const showToast = (props?: MOmit<AtToastProps, "isOpened">) => {
    return new Promise((resolve, reject) => {
      let page = getDRPage();
      if (!page) {
        reject();
        return;
      }
      page._$DRHandler.renderOnFront(
        <AtToast
          isOpened
          {...props}
          onClose={() => {
            page._$DRHandler.detachOnFront();
            resolve(void 0);
          }}
        />
      );
    });
  };

  type MsgType = "info" | "success" | "error" | "warning";
  /**
   * 显示顶部信息
   */
  export const showMsg = (options: {
    message: string;
    type: MsgType;
    duration?: number;
  }) => {
    return new Promise((resolve, reject) => {
      let page = getDRPage();
      if (!page) {
        reject();
        return;
      }
      page._$DRHandler.renderOnFront(<AtMessage />).then(() => {
        // NOTICE 保证渲染之后才去执行 否则异常
        let { message, type, duration } = options;
        if (!duration) duration = 3000;
        (Taro as any).atMessage({
          message,
          type,
          duration
        });
        // 这里有个动画时间需要延迟
        page._$DRHandler.detachOnFront(duration + 500).then(resolve);
      });
    });
  };
}

export default MUI;
