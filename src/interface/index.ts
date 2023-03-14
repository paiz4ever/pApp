/**
 * 约束接口中各属性
 * 当RequireKeys中的key未赋值时 PartialKeys不能单独使用
 */
type ExcludeKeys<T> = { [P in keyof T]: never; }
export type RP<T, RequireKeys extends keyof T = keyof T, PartialKeys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, RequireKeys>>
    & ((Required<Pick<T, RequireKeys>> & Partial<Pick<T, PartialKeys>>)
        | ExcludeKeys<Pick<T, RequireKeys | PartialKeys>>)

/**
 * 去除接口属性
 */
export type MOmit<T, K extends keyof T> = Omit<T, K>;

export type OneMore<T> = T | T[]; 