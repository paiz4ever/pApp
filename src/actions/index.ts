import { IActionType } from "@/interface/redux";

/**
 * // NOTICE prebundle 使用 esbuild 编译 ts 文件，不支持 const a = <T>(b: T) => ({})  这类写法
 * 需要改为 function a <T> (b: T) { return {} }
 * 可以参照hoc.tsx来先定义一个type
 */
// export const createAction = <T>(type: keyof T, payload?: any): IActionType<T> => {
//   return {
//     type,
//     payload
//   };
// };

export function createAction<T>(type: keyof T, payload?: any): IActionType<T> {
  return {
    type,
    payload
  };
}
