import { FC, useState } from "react";
import { View, Text, Button, ScrollView } from "@tarojs/components";
import { AppInfo } from "@/config";
import "./index.scss";
import Taro, {
  usePageScroll,
  usePullDownRefresh,
  useReachBottom
} from "@tarojs/taro";
import {
  Cell,
  FixedNav,
  ImagePreview,
  Popup,
  SideNavBar,
  SideNavBarItem,
  Sticky,
  SubSideNavBar
} from "@nutui/nutui-react-taro";
import avatar from "@/assets/image/test/avatar.jpg";

const Test: FC = () => {
  const navList = [
    {
      id: 1,
      text: "首页",
      icon: "https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png"
    },
    {
      id: 2,
      text: "分类",
      icon: "https://img12.360buyimg.com/imagetools/jfs/t1/119490/8/9568/1798/5ef83e95E968c69a6/dd029326f7d5042e.png"
    },
    {
      id: 3,
      text: "购物车",
      num: 2,
      icon: "https://img14.360buyimg.com/imagetools/jfs/t1/130725/4/3157/1704/5ef83e95Eb976644f/b36c6cfc1cc1a99d.png"
    },
    {
      id: 4,
      text: "我的",
      icon: "https://img12.360buyimg.com/imagetools/jfs/t1/147573/29/1603/1721/5ef83e94E1393a678/5ddf1695ec989373.png"
    }
  ];
  const [visible, setVisible] = useState(false);
  const change = (value: boolean) => {
    setVisible(value);
  };
  const selected = (item: any, event: MouseEvent) => {
    console.log(item, event);
    Taro.navigateBack();
  };
  return (
    <>
      <FixedNav
        navList={navList}
        activeText="基础用法"
        overlay
        position={{ top: "70px" }}
        onChange={change}
        visible={visible}
        onSelected={selected}
      />
    </>
  );

  const [navBarState, setNavBarState] = useState({
    visible: false,
    position: "left"
  });
  const changeNarBar = (visible, position = navBarState.position) => {
    setNavBarState({
      visible,
      position
    });
  };
  console.log(navBarState);
  return (
    <>
      <Cell
        title="左侧弹出"
        isLink
        onClick={() => {
          changeNarBar(true, "left");
        }}
      />
      <Cell
        title="右侧弹出"
        isLink
        onClick={() => {
          changeNarBar(true, "right");
        }}
      />
      <SideNavBar
        title="首页"
        visible={navBarState.visible}
        position={navBarState.position}
        onClose={() => {
          changeNarBar(false);
        }}
      >
        <SubSideNavBar title="一级标题" ikey="1-0">
          <SideNavBarItem title="一级内容1" ikey="1-01" />
          <SideNavBarItem title="一级内容2" ikey="1-02" />
          <SubSideNavBar title="二级标题" ikey="2-0">
            <SideNavBarItem title="二级内容1" ikey="2-01" />
            <SideNavBarItem title="二级内容2" ikey="2-02" />
          </SubSideNavBar>
        </SubSideNavBar>
      </SideNavBar>
    </>
  );

  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  return (
    <View>
      <Cell
        title="顶部弹出"
        isLink
        onClick={() => {
          setShowTop(true);
        }}
      />
      <Cell
        title="底部弹出"
        isLink
        onClick={() => {
          setShowBottom(true);
        }}
      />
      <Cell
        title="左侧弹出"
        isLink
        onClick={() => {
          setShowLeft(true);
        }}
      />
      <Cell
        title="右侧弹出"
        isLink
        onClick={() => {
          setShowRight(true);
        }}
      />
      <Popup
        visible={showTop}
        style={{ height: "20%" }}
        position="top"
        onClose={() => {
          setShowTop(false);
        }}
      />
      <Popup
        visible={showBottom}
        style={{ height: "20%" }}
        position="bottom"
        onClose={() => {
          setShowBottom(false);
        }}
      />
      <Popup
        visible={showLeft}
        style={{ width: "20%", height: "100%" }}
        position="left"
        onClose={() => {
          setShowLeft(false);
        }}
      />
      <Popup
        visible={showRight}
        style={{ width: "20%", height: "100%" }}
        position="right"
        onClose={() => {
          setShowRight(false);
        }}
      />
    </View>
  );

  useReachBottom(() => {});

  usePullDownRefresh(() => {});

  usePageScroll((res) => {});

  let [num, setNum] = useState(0);
  const images = [
    {
      src: "//m.360buyimg.com/mobilecms/s750x366_jfs/t1/18629/34/3378/144318/5c263f64Ef0e2bff0/0d650e0aa2e852ee.jpg"
    },
    {
      src: "//m.360buyimg.com/mobilecms/s750x366_jfs/t1/26597/30/4870/174583/5c35c5d2Ed55eedc6/50e27870c25e7a82.png"
    },
    {
      src: "//m.360buyimg.com/mobilecms/s750x366_jfs/t1/9542/17/12873/201687/5c3c4362Ea9eb757d/60026b40a9d60d85.jpg"
    },
    {
      src: "//m.360buyimg.com/mobilecms/s750x366_jfs/t1/30042/36/427/82951/5c3bfdabE3faf2f66/9adca782661c988c.jpg"
    }
  ];
  const [showPreview2, setShowPreview2] = useState(false);

  const showFn2 = () => {
    // Taro.previewImage({
    //   urls: [
    //     "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",

    //   ]
    // });
    // setShowPreview2(true);
    setNum(2);
  };

  const hideFn2 = () => {
    // setShowPreview2(false);
  };

  return (
    <>
      <ImagePreview
        images={images}
        initNo={2}
        show={!!num}
        paginationVisible
        paginationColor="#000"
        autoplay={0}
        // onClose={hideFn2}
        // contentClose
      />
      <Cell title="设置初始页码" isLink onClick={showFn2} />
      {/* <h2>基础用法</h2>
      <Cell style={{ height: "500px" }}>
        <Sticky top={57} onChange={(val: boolean) => console.log("++++", val)}>
          <Button type="primary" onClick={() => setShowBottom(true)}>吸顶</Button>
        </Sticky>
      </Cell>
      <h2>吸顶距离</h2>
      <Cell style={{ height: "500px" }}>
        <Sticky top={120}>
          <Button type="primary">距离顶部120px</Button>
        </Sticky>
      </Cell>
      <h2>吸底距离</h2>
      <Cell style={{ height: "200px" }}>
        <Sticky top={0} position="bottom">
          <Button type="primary">距离底部0px</Button>
        </Sticky>
      </Cell> */}
      {/* <Cell
        title="底部弹出"
        isLink
        onClick={() => {
          setShowBottom(true);
        }}
      />
      <Popup
        visible={showBottom}
        style={{ height: "20%" }}
        position="bottom"
        onClose={() => {
          setShowBottom(false);
        }}
        round
      /> */}
    </>
  );
};

export default Test;
