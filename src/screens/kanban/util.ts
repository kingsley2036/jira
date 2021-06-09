import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import { useUrlQueryParams } from "../../utils/url";
import { useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};
export const useProjectInUrl = () => useProject(useProjectIdInUrl());
export const useTasksSearchParams = () => {
  const [{ name, typeId, processorId, tagId }] = useUrlQueryParams([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(() => {
    return {
      projectId,
      name,
      typeId: Number(typeId) || undefined,
      processorId: Number(processorId) || undefined,
      tagId: Number(tagId) || undefined,
    };
  }, [name, typeId, processorId, tagId, projectId]);
};
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];
