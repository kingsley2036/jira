import {useEffect,useState} from 'react';
const isFalsy=(value)=>{
    return value===0?false:!value
}

export const cleanObjet=(object)=>{
      const result={...object} // 浅拷贝,只适用于简单对象
      Object.keys(result).forEach(key=>{
        const value=result[key]
        if(isFalsy(value)){
          delete result[key]
        }
      })
      return result
}

export const useMount=(callback)=>{
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce=(value,delay)=>{
  const  [debouneValue, setdebouneValue] = useState(value)  // 初始状态是什么
  useEffect(()=>{
    const timer=setTimeout(()=>{
      // value变化会导致一直重置定时器,所以setdebouneValue一直没有执行,直到value不变化
      setdebouneValue(value) 
                 
    },delay)
    return ()=>{
      clearTimeout(timer)
    }
  },[value,delay])
  return debouneValue  // 他其实一直在返回value,只是value一直变化时,debouneValue不变

}