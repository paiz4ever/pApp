import Mask, { IMaskProps } from "@/components/interaction/mask";
import { getDRPage } from "./page";

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
