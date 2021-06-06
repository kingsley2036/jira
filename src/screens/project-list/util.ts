import { useUrlQueryParams } from "../../utils/url";
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

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParams([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const setId = (id: number) => setEditingProjectId({ editingProjectId: id });
  const open = () => {
    setProjectCreate({ projectCreate: true });
  };
  const close = () => {
    setProjectCreate({ projectCreate: null });
  };
  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
    setId,
    editingProject,
    isLoading,
  };
};
