import { QueryKey, useQueryClient } from "react-query";

export const useOptimisticOptions = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(queryKey);
      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old); // 回调
      });
      return { previousTodos };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err: any, newTodo: any, context: any) => {
      queryClient.setQueryData(queryKey, context.previousTodos);
    },
  };
};
export const useOptimisticDelete = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, old) => {
    return (
      old?.filter((item) => {
        return item.id !== target.id;
      }) || []
    );
  });

export const useOptimisticEdit = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, old) => {
    return (
      old?.map((item) => {
        return item.id === target.id ? { ...item, ...target } : item;
      }) || []
    );
  });

export const useOptimisticAdd = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, old) => {
    return old?.length ? [target, ...old] : [target];
  });
