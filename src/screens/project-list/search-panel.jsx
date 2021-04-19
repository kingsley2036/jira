import { useEffect, useState } from "react";
export const SearchPanel = ({param,setParam}) => {

  const [users,setUsers]=useState([])

  return (
    <form>
      <input
        type='text'
        value={param.name}
        onChange={(e) => {
          setParam({
            name: e.target.value,
            ...param,
          });
        }}
      ></input>
      <select value={param.personId} onChange={(e)=>{
        setParam({
          ...param,
          personId:e.target.value
        })
      }}>
        <option value='负责人'></option>
        {users.map(item=>{
          return <option value={item.id}>{item.name}</option>
        })}
      </select>
    </form>
  );
};
