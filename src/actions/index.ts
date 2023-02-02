import { ActionType } from "@/constants";

export const createAction = <T>(type: keyof T, payload: any): ActionType<T> => {
  return {
    type,
    payload
  };
};
