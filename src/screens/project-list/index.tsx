import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce, useArray } from "utils/index";
import { useHttp } from "../../utils/http";
import axios from "axios";

interface person {
  name: string;
  age: number;
}
const persons: person[] = [
  {
    name: "jack",
    age: 25,
  },
  {
    name: "ma",
    age: 25,
  },
];

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const debounceValue = useDebounce(param, 1000);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [list, setList] = useState([]);
  const client = useHttp();
  useEffect(() => {
    client("projects", { data: cleanObject(debounceValue) }).then((res) => {
      setList(res);
    });
  }, [debounceValue, apiUrl]);
  useMount(() => {
    client("users").then((res) => {
      setUsers(res);
    });
  });
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
