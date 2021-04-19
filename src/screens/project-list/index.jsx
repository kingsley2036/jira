import { useEffect, useState } from "react";
import {SearchPanel}from './search-panel'
import List from './list'
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list,setList]=useState([])
  useEffect(() => {
    fetch('').then(async (res)=>{
      if(res.ok){
        setList(await res.json())
      }
    })
   
  }, [param])
  return <div>
    <SearchPanel param={param} setParam={setParam}></SearchPanel>
    <List list={list}></List>
  </div>
}