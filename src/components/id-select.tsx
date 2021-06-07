import { Raw } from "../types";
import { Select } from "antd";
import React from "react";

type selectProps = React.ComponentProps<typeof Select>;

interface idSelectProps
  extends Omit<selectProps, "value" | "onchange" | "options"> {
  value?: Raw | null | undefined;
  onchange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

export const IdSelect = (props: idSelectProps) => {
  const { value, onchange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0} // 这里options默认是一个空数组,所以length为0,所以会走第二个判断.
      onChange={(value) => onchange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => {
        return (
          <Select.Option value={option.id} key={option.id}>
            {option.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};
// 如果不可以转换成数字那么就返回0,否则就返回转换成的数字
// 这里面就要求不可以用o作为option的value否则有歧义,这也算是一个小约定吧
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

/*写这个组件的目的是为了组件返回值的确定性
即统一返回数字或者undefined
*
* */
