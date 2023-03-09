import { DynamRenderHanlder } from "@/utils/ui/hoc.h";
import type { Page } from "@tarojs/taro";

export type ICustomPage = Page & {
    _$DRHandler?: DynamRenderHanlder
}