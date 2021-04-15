import { useEffect, useState } from "react";
export const SearchPanel = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users,setUsers]=useState([])
  const [list,setList]=useState([])
  useEffect(() => {
    fetch().then(async (res)=>{
      if(res.ok){
        setList(await res.json())
      }
    })
   
  }, [param])
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
