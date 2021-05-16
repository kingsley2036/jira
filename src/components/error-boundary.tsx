import React, { ReactElement, ReactNode } from "react";
type FallbackRender = (props: { error: Error | null }) => ReactElement; // 这里props的类型用了简写,正常情况下是一个interface={error:Error|null}
export class ErrorBoundary extends React.Component<
  { children: ReactNode; fallbackRender: FallbackRender },
  { error: Error | null }
> {
  state = {
    error: null,
  };
  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error };
  }
  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      // 你可以自定义降级后的 UI 并渲染
      return fallbackRender({ error });
    }
    return children;
  }
}
