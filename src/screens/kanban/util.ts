import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import { useUrlQueryParams } from "../../utils/url";
import { useCallback, useMemo } from "react";
import { useTask } from "../../utils/task";
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
export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParams([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
