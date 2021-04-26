import { useEffect, useState } from "react";
export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export const SearchPanel = ({
  param,
  setParam,
  users,
}: {
  param: { name: string; personId: number };
  setParam: any;
  users: any;
}) => {
  return (
    <form>
      <input
        type="text"
        value={param.name}
        onChange={(e) => {
          setParam({
            ...param,
            name: e.target.value,
          });
        }}
      ></input>
      <select
        value={param.personId}
        onChange={(e) => {
          setParam({
            ...param,
            personId: e.target.value,
          });
        }}
      >
        <option value={""}>负责人</option>
        {users.map((item: any) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};
