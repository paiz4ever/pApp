import { FC, useState } from "react";
import { ScrollView, Text, View } from "@tarojs/components";
import "./index.scss";
import { dynamRender } from "@/utils/ui/hoc";
import Bg from "@/components/common/bg";
import Bar from "@/components/common/layout/bar";
import Content from "@/components/common/layout/content";
import avatar from "@/assets/image/test/avatar.jpg";
import {
  SearchBar,
  Avatar,
} from "@nutui/nutui-react-taro";
import { AppInfo } from "@/config";
import GoodsInfo from "@/components/ui/goods-info";
import Menu from "@/components/ui/menu";

const Index: FC = () => {
  let [searchValue, setSearchValue] = useState("");
  let [showMenu, setShowMenu] = useState(false);
  let [showGoodsInfo, setShowGoodsInfo] = useState(false);

  return (
    <Bg banFlex>
      <GoodsInfo
        isShow={showGoodsInfo}
        onClose={() => setShowGoodsInfo(false)}
      />
      <Menu isShow={showMenu} onClose={() => setShowMenu(false)} />
      <Bar>
        <View
          onClick={() => {
            setShowMenu(true);
          }}
        >
          <Avatar size="normal" url={avatar}></Avatar>
        </View>
      </Bar>
      <Content banFlex>
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
        <ScrollView className="scroller" scrollY scrollWithAnimation>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{ width: "95%" }}>
              <Text className="title">最受欢迎的服装</Text>
              <ScrollView
                scrollX
                style={{
                  height: "200px",
                  whiteSpace: "nowrap",
                  marginTop: "20px"
                }}
              >
                {Array(10)
                  .fill(1)
                  .map((element, index) => (
                    <View
                      key={index}
                      style={{
                        display: "inline-block",
                        height: "100%",
                        width: "182px",
                        backgroundColor: index % 2 ? "#000000" : "#ff0000"
                      }}
                      onClick={() => setShowGoodsInfo(true)}
                    >
                      A
                    </View>
                  ))}
              </ScrollView>
            </View>
          </View>
          <View>
            {Array(10)
              .fill(1)
              .map((element, index) => (
                <View
                  key={index}
                  style={{
                    height: "200px",
                    backgroundColor: index % 2 ? "#000000" : "#ff0000"
                  }}
                  onClick={() => setShowGoodsInfo(true)}
                >
                  A
                </View>
              ))}
          </View>
        </ScrollView>
      </Content>
    </Bg>
  );
};

export default dynamRender(Index);
