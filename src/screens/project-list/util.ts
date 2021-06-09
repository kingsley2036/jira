import { useSetUrlSearchParams, useUrlQueryParams } from "../../utils/url";
import { useMemo } from "react";
import { useProject } from "../../utils/project";

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
export const useProjectsQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};
export const useProjectModal = () => {
  // useUrlQueryParams 这个自定义hook有些许问题
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParams([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const setUrlParams = useSetUrlSearchParams();
  const open = () => {
    setProjectCreate({ projectCreate: true });
  };
  const close = () => {
    // 下面这种写法有问题,projectCreate改不成null,不太清楚为什么
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });
  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
