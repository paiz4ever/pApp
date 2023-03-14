import { FC, useState } from "react";
import "./index.scss";
import SafeEmpty from "@/components/common/safe-empty";

const SelectDrawer: FC<ISelectDrawerProps> = ({ isShow, onClose }) => {
  let [open, setOpen] = useState(false);
  let [open1, setOpen1] = useState(false);

  if (!isShow) return null;
  return null
  // return (
  //   <AtDrawer show mask onClose={onClose} width="300px">
  //     <SafeEmpty />
  //     <AtList>
  //         <AtListItem
  //           title="标题文字"
  //           isSwitch
  //           onSwitchChange={() => {}}
  //         />
  //       </AtList>
  //     <AtAccordion
        
  //       open={open}
  //       onClick={() => {
  //         console.log(
  //           "++++",
  //           setOpen((o) => !o)
  //         );
  //       }}
  //       title="标题一"
  //     >
  //       <AtList>
  //         <AtListItem
  //           title="标题文字"
  //           isSwitch
  //           onSwitchChange={() => {}}
  //         />
  //       </AtList>
  //     </AtAccordion>
  //     <AtAccordion
  //       isAnimation={false}
  //       open={open1}
  //       onClick={() => {
  //         console.log(
  //           "++++",
  //           setOpen1((o) => !o)
  //         );
  //       }}
  //       title="标题一"
  //     >
  //       <AtList>
  //         <AtListItem
  //           title="标题文字"
  //           arrow="right"
  //           thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
  //         />
  //       </AtList>
  //     </AtAccordion>
  //   </AtDrawer>
  // );
};

export interface ISelectDrawerProps {
  isShow: boolean;
  onClose(): void;
}

export default SelectDrawer;
