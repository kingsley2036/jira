import { useHttp } from "./http";
import { Project } from "../screens/project-list/list";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};
// 编辑
export const useEditProjects = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      onSuccess() {
        return queryClient.invalidateQueries("projects");
      },
    }
  );
};
// 新增
export const useAddProjects = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess() {
        return queryClient.invalidateQueries("projects");
      },
    }
  );
};

export const useProject = (id: number) => {
  const client = useHttp();
  return useQuery<Project>(["project", id], () => client(`projects/${id}`), {
    enabled: Boolean(id), //id存在才查询
  });
};
