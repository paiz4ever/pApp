import { FC } from "react";
import "./index.scss";
import { View } from "@tarojs/components";
import {
  SideNavBar,
  SideNavBarItem,
  SubSideNavBar
} from "@nutui/nutui-react-taro";

const Menu: FC<IMenuProps> = ({ isShow, onClose }) => {
  return (
    <View>
      <SideNavBar
        title="菜单"
        visible={isShow}
        position="left"
        onClose={onClose}
        width="50%"
        offset={0}
      >
        <SubSideNavBar open={false} title="一级标题" ikey="1-0">
          <SideNavBarItem title="一级内容1" ikey="1-01" />
          <SideNavBarItem title="一级内容2" ikey="1-02" />
          <SubSideNavBar open={false} title="二级标题" ikey="2-0">
            <SideNavBarItem title="二级内容1" ikey="2-01" />
            <SideNavBarItem title="二级内容2" ikey="2-02" />
          </SubSideNavBar>
        </SubSideNavBar>
      </SideNavBar>
    </View>
  );
};

export interface IMenuProps {
  isShow: boolean;
  onClose(): void;
}

export default Menu;
