import { FC } from "react";
import "./index.scss";
import { View } from "@tarojs/components";
import { Cell, CellGroup, Icon, Popup, Switch } from "@nutui/nutui-react-taro";
import { custom } from "@/utils/ui/hoc";
import SafeEmpty from "@/components/common/safe-empty";
import { AppInfo } from "@/config";
import Taro from "@tarojs/taro";

const Menu: FC<IMenuProps> = ({ isShow, onClose }) => {
  return (
    <View className="cell-style">
      <Popup
        className="popup"
        visible={isShow}
        style={{ width: "70%", height: "100%" }}
        position="left"
        onClose={onClose}
        round
      >
        <SafeEmpty offset={30} />
        <CellGroup className="group" title="功能模块">
          <Cell roundRadius={0} title="Switch" linkSlot={<Switch checked />} />
          <Cell
            roundRadius={0}
            title="Switch"
            subTitle="副标题"
            linkSlot={<Switch checked />}
          />
          <Cell roundRadius={0} title="Switch" desc="右侧描述" />
          <Cell roundRadius={0} title="Switch" isLink />
          <Cell
            roundRadius={0}
            title="Switch"
            icon="cart2"
            linkSlot={<Switch checked />}
          />
          <Cell
            roundRadius={0}
            title="Switch"
            center
            linkSlot={<Switch checked />}
          />
          <Cell
            roundRadius={0}
            title="Switch"
            iconSlot={<Icon name="cart" />}
          />
        </CellGroup>
        <CellGroup title="个人设置">
          <Cell
            roundRadius={0}
            title="Switch"
            linkSlot={<Icon name="right" color={AppInfo.theme.deepColor} />}
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/test/index"
              })
              onClose();
            }}
          />
          <Cell roundRadius={0} title="Switch" linkSlot={<Switch checked />} />
          <Cell roundRadius={0} title="Switch" linkSlot={<Switch checked />} />
        </CellGroup>
      </Popup>
    </View>
  );
};

export interface IMenuProps {
  isShow: boolean;
  onClose(): void;
}

export default custom(Menu);
