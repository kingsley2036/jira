import { useEffect, useState } from "react";
export const SearchPanel = ({param,setParam,users}) => {


  return (
    <form>
      <input
        type='text'
        value={param.name}
        onChange={(e) => {
          setParam({
            ...param,
            name: e.target.value,
          });
        }}
      ></input>
      <select value={param.personId} onChange={(e)=>{
        setParam({
          ...param,
          personId:e.target.value
        })
      }}>
        <option value={''}>负责人</option>
        {users.map(item=>{
          return <option key={item.id} value={item.id}>{item.name}</option>
        })}
      </select>
    </form>
  );
};
