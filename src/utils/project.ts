import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "./index";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...rest } = useAsync<Project[]>();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(params || {}) }),
    [params, client]
  );

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [run, fetchProjects]);
  return rest;
};
// 编辑
export const useEditProjects = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync();
  // 使用hooks返回一个函数,用它来处理编辑,这样就避开了hooks的限制
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
