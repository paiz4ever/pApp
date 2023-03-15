import { FC, useState } from "react";
import { View, Text, Button, ScrollView } from "@tarojs/components";
import { AppInfo } from "@/config";
import "./index.scss";
import Taro, {
  usePageScroll,
  usePullDownRefresh,
  useReachBottom
} from "@tarojs/taro";
import { Cell, ImagePreview, Popup, Sticky } from "@nutui/nutui-react-taro";
import avatar from "@/assets/image/test/avatar.jpg";

const Test: FC = () => {
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
