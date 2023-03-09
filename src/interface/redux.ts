export interface IActionType<T> {
  type: keyof T;
  payload?: any;
}