import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "success" | "error";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};
const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const config = { ...defaultConfig, ...initialConfig };
  const setData = (data: D) => {
    setState({
      error: null,
      data,
      stat: "success",
    });
  };
  const setError = (error: Error) => {
    setState({
      error: error,
      data: null,
      stat: "error",
    });
  };
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise");
    }
    setState({
      ...state,
      stat: "loading",
    });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) return Promise.reject(error); // 这里有一个需求是:不总是抛出错误
        return error;
      });
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
