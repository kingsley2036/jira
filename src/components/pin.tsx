import React from "react";
import { Rate } from "antd";
type rateProps = React.ComponentProps<typeof Rate>;
interface pinProps extends rateProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
export const Pin = (props: pinProps) => {
  const { checked, onCheckedChange, ...restProps } = props;
  return (
    <Rate
      value={checked ? 1 : 0}
      count={1}
      {...restProps}
      onChange={(value) => onCheckedChange?.(Boolean(value))}
    />
  ); // onchange会把组件选中的个数传给传进来的回调
};
