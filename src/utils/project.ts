import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "./index";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...rest } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(params || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return rest;
};
