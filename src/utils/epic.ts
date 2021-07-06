import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useOptimisticAdd,
  useOptimisticDelete,
} from "utils/use-optimistic-options";
import { Epic } from "types/epic";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(["epics", param], () =>
    client("epics", { data: param })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: "POST",
      }),
    useOptimisticAdd(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useOptimisticDelete(queryKey)
  );
};
