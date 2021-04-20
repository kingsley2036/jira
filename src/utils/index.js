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