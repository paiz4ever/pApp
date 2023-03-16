import { FC, useState } from "react";
import "./index.scss";
import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components";
import { ImagePreview, Popup, Price, Button } from "@nutui/nutui-react-taro";
import avatar from "@/assets/image/test/avatar.jpg";
import { AppInfo } from "@/config";
import { connect } from "react-redux";

const GoodsInfo: FC<IGoodsInfoProps> = ({ isShow, onClose }) => {
  const [isClick, setIsClick] = useState(false);
  const [clickNum, setClickNum] = useState(0);

  let urls = [avatar, avatar, avatar];

  return (
    <View>
      <Popup
        className="popup"
        visible={isShow}
        style={{ height: "70%" }}
        position="bottom"
        onClose={() => {
          setIsClick(false);
          onClose && onClose();
        }}
        round
      >
        <Swiper
          className="swiper"
          indicatorColor="#ffffff"
          indicatorActiveColor={AppInfo.theme.deepColor}
          circular
          indicatorDots
          autoplay={!isClick}
          interval={3000}
        >
          {urls.map((v, i) => (
            <SwiperItem
              key={i}
              onClick={() => {
                setIsClick(true);
                setClickNum(i + 1);
              }}
            >
              <Image className="full" mode="aspectFill" src={v}></Image>
            </SwiperItem>
          ))}
        </Swiper>
        <View className="info">
          <View className="info-content">
            <View className="title-price">
              <Text>商品名字</Text>
              <Price
                className="price"
                price={0}
                size="large"
                needSymbol
                thousands
              />
            </View>
            <View className="desc">商品描述商品描述商品描</View>
            {/* <Ellipsis
              className="desc"
              content="商品描述商品描述商品描"
              expandText="展开"
              collapseText="收起"
            /> */}
            <View className="color-title">颜色</View>
            <View className="container">
              {["#000000", "#607374", "#ffffff", "#5F3636", "#3F3D56"].map(
                (v, i) => (
                  <View
                    key={i}
                    className="color-style"
                    style={{ backgroundColor: v }}
                  ></View>
                )
              )}
            </View>
            <View className="size-title">尺寸</View>
            <View className="container">
              {["XS", "S", "M", "L", "XL", "XXL"].map((v, i) => (
                <View key={i} className="size-style">
                  {v}
                </View>
              ))}
            </View>
            <View className="btn-container">
              <Button
                color="#5F3636"
                icon="cart2"
                iconSize={18}
                className="btn-addcart"
                type="primary"
              >
                加入购物车
              </Button>
              <Button color="#C0A286" className="btn-buy" type="primary">
                立即购买
              </Button>
            </View>
          </View>
        </View>
      </Popup>
      <View>
        {clickNum ? (
          <ImagePreview
            images={urls.map((v) => ({ src: v }))}
            initNo={clickNum}
            show
            autoplay={0}
            paginationVisible
            paginationColor={AppInfo.theme.deepColor}
            onClose={() => {
              setClickNum(0);
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export interface IGoodsInfoProps {
  isShow: boolean;
  onClose(): void;
}

export default GoodsInfo;
