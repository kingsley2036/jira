import { useUrlQueryParams } from "../../utils/url";
import { useMemo } from "react";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParams(["name", "personId"]);
  // 这里 param: {name: string, personId: string}是因为参数都是从url解析的,自然类型都是string
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined };
    }, [param]),
    setParam,
  ] as const;
};
