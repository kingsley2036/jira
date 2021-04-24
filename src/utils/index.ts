import react, { useEffect, useState } from "react";
const isFalsy = (value: any) => {
  return value === 0 ? false : !value;
};

export const cleanObjet = (object: any) => {
  const result = { ...object }; // 浅拷贝,只适用于简单对象
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: any) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: any, delay: number) => {
  const [debouneValue, setdebouneValue] = useState(value); // 初始状态是什么
  useEffect(() => {
    const timer = setTimeout(() => {
      // value变化会导致一直重置定时器,所以setdebouneValue一直没有执行,直到value不变化
      setdebouneValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouneValue; // 他其实一直在返回value,只是value一直变化时,debouneValue不变
};
interface arrayProp<T> {
  name: string;
  age: number;
}
export const useArray = <T>(array: T[]) => {
  const [value, setValue] = useState(array);

  return {
    value,
    add: (p: T) => {
      setValue([...value, p]);
    },
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
    clear: () => {
      setValue([]);
    },
  };
};
