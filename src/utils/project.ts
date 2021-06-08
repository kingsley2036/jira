import { useHttp } from "./http";
import { Project } from "../screens/project-list/list";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useOptimisticAdd,
  useOptimisticDelete,
  useOptimisticEdit,
} from "./use-optimistic-options";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};
// 编辑
export const useEditProjects = (queryKey: QueryKey) => {
  const client = useHttp();
  const mutateOptions = useOptimisticEdit(queryKey);
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      ...mutateOptions,
    }
  );
};
// 新增
export const useAddProjects = (queryKey: QueryKey) => {
  const client = useHttp();
  const mutateOptions = useOptimisticAdd(queryKey);
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      ...mutateOptions,
    }
  );
};
//删除
export const useDeleteProjects = (queryKey: QueryKey) => {
  const client = useHttp();
  const mutateOptions = useOptimisticDelete(queryKey);
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "DELETE",
      }),
    {
      ...mutateOptions,
    }
  );
};
// 获取项目详情
export const useProject = (id: number) => {
  const client = useHttp();
  return useQuery<Project>(["project", id], () => client(`projects/${id}`), {
    enabled: Boolean(id), //id存在才查询
  });
};
