import { useCallback, useState } from "react";
import { useMountedRef } from "./index";

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
  // 定义刷新方法,要求可以重新调用run方法
  const [retry, setRetry] = useState(() => () => {});
  const config = { ...defaultConfig, ...initialConfig };
  const setData = useCallback((data: D) => {
    setState({
      error: null,
      data,
      stat: "success",
    });
  }, []);
  const setError = useCallback((error: Error) => {
    setState({
      error: error,
      data: null,
      stat: "error",
    });
  }, []);
  const mountedRef = useMountedRef();
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise");
      }
      setState((preState) => ({ ...preState, stat: "loading" }));
      // 确实是使用的上一次run运行时的promise,
      // 而且是需要发请求的使用的promise
      // 其实我觉得这样封装有点过渡设计了,不就是重新发个请求,然后刷新页面吗,至于搞得这么复杂吗
      setRetry(() => () => {
        if (runConfig) {
          run(runConfig.retry(), runConfig);
        }
      });
      return promise
        .then((data) => {
          if (mountedRef.current) {
            setData(data);
            return data;
          }
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error); // 这里有一个需求是:不总是抛出错误
          return error;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  ); // 不要把state加入到依赖里面
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    retry, // 刷新方法
    setData,
    setError,
    ...state,
  };
};
