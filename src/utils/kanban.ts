import { Kanban } from "../types/kanban";
import { useHttp } from "./http";
import { useQuery } from "react-query";

export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: params })
  );
};
