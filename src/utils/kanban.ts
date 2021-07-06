import { Kanban } from "../types/kanban";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useOptimisticAdd } from "./use-optimistic-options";

export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: params })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useOptimisticAdd(queryKey)
  );
};
