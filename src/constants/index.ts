export interface ActionType<T> {
  type: keyof T;
  payload: any;
}
