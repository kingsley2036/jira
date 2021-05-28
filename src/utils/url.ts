import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";
// 这里使用泛型:即不指定类型,使用的时候再传入类型
// 并且使用泛型约束来约束K的类型
// 这里的 key in K 用法具体是什么
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
          // eslint-disable-next-line
        }, {} as { [key in K]: string }),
      [searchParams]
    ), //key in K 这种语法没用过
    (params: Partial<{ [key in K]: unknown }>) => {
      const newObj = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      setSearchParams(newObj);
    },
  ] as const;
};
const a = [1, "2", { key: "value" }]; // 类型推断为 (string | number | { key: string; })[]
const b = [1, "2", { key: "value" }] as const; // 推断为  readonly [1, "2", {     readonly key: "value"; }]
