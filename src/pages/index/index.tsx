import { FC, useState } from "react";
import { View } from "@tarojs/components";
import "./index.scss";
import { dynamRender } from "@/utils/ui/hoc";
import Bg from "@/components/common/bg";
import Bar from "@/components/common/layout/bar";
import Content from "@/components/common/layout/content";
import avatar from "@/assets/image/test/avatar.jpg";
import {
  SearchBar,
  Avatar,
  SideNavBar,
  SubSideNavBar,
  SideNavBarItem
} from "@nutui/nutui-react-taro";
import { AppInfo } from "@/config";

const Index: FC = () => {
  let [searchValue, setSearchValue] = useState("");
  let [showNav, setShowNav] = useState(false);

  return (
    <Bg banFlex>
      <Bar>
        <View
          onClick={() => {
            setShowNav(true);
          }}
        >
          <Avatar size="normal" url={avatar}></Avatar>
        </View>
      </Bar>
      <Content>
        <SearchBar
          className="search"
          background={AppInfo.theme.lightColor}
          align="center"
          placeholder="搜你喜欢"
          actionText="搜索"
          value={searchValue}
          onSearch={(val) => {
            console.log(val);
            setSearchValue("");
          }}
          onChange={(val) => {
            setSearchValue(val);
          }}
        />
      </Content>
      <SideNavBar
        title=""
        visible={showNav}
        position="left"
        onClose={() => {
          setShowNav(false);
        }}
        width="50%"
        offset={0}
      >
        {/* <SafeEmpty /> */}
        <SubSideNavBar open={false} title="一级标题" ikey="1-0">
          <SideNavBarItem title="一级内容1" ikey="1-01" />
          <SideNavBarItem title="一级内容2" ikey="1-02" />
          <SubSideNavBar open={false} title="二级标题" ikey="2-0">
            <SideNavBarItem title="二级内容1" ikey="2-01" />
            <SideNavBarItem title="二级内容2" ikey="2-02" />
          </SubSideNavBar>
        </SubSideNavBar>
      </SideNavBar>
      {/* <SelectDrawer
        onClose={() => setShowDrawer(false)}
        isShow={showDrawer}
      ></SelectDrawer> */}
    </Bg>
  );
};

export default dynamRender(Index);
