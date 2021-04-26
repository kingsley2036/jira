import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObjet, useMount, useDebounce, useArray } from "utils/index";
import qs from "qs";

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
    personId: 0,
  });
  const [users, setUsers] = useState([]);
  const debounceValue = useDebounce(param, 1000);
  const { value, add, removeIndex, clear } = useArray(persons);

  const apiUrl = process.env.REACT_APP_API_URL;
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObjet(param))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      }
    );
  }, [debounceValue, apiUrl]);
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};
