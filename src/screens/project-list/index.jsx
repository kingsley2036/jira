import { useEffect, useState } from "react";
import {SearchPanel}from './search-panel'
import {List} from './list'
import {cleanObjet,useMount,useDebounce} from 'utils/index'
import qs from 'qs'
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users,setUsers]=useState([])
  const debounceValue=useDebounce(param,1000)

  const apiUrl=process.env.REACT_APP_API_RUL
  const [list,setList]=useState([])
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObjet(param))}`).then(async (res)=>{
      if(res.ok){
        setList(await res.json())
      }
    })
   
  }, [debounceValue,apiUrl])
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res)=>{
      if(res.ok){
        setUsers(await res.json())
      }
    })
  })
  return (
  <div>
    <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
    <List users={users} list={list}></List>
  </div>
  )
}