import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";
// 这里使用泛型:即不指定类型,使用的时候再传入类型
// 并且使用泛型约束来约束K的类型
// 这里的 key in K 用法具体是什么
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line
      [searchParams]
    ), //key in K 这种语法没用过
    (params: Partial<{ [key in K]: unknown }>) => {
      setSearchParams(params);
    },
  ] as const;
};
export const useSetUrlSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const newObj = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    setSearchParams(newObj);
  };
};
