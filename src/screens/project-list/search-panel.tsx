import { useEffect, useState } from "react";
import { Input, Select } from "antd";

export interface User {
  id: string;
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
  param: { name: string; personId: string };
  setParam: any;
  users: any;
}) => {
  return (
    <form>
      <Input
        type="text"
        value={param.name}
        onChange={(e) => {
          setParam({
            ...param,
            name: e.target.value,
          });
        }}
      />
      <Select
        value={param.personId}
        onChange={(value) => {
          setParam({
            ...param,
            personId: value,
          });
        }}
      >
        <Select.Option value={""}>负责人</Select.Option>
        {users.map((item: any) => {
          return (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          );
        })}
      </Select>
    </form>
  );
};
