import { useTasksSearchParams } from "./util";
import { useSetUrlSearchParams } from "../../utils/url";
import { Row } from "../../components/lib";
import { Button, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/type-select";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParams();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row gap={true} marginBottom={5}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        value={searchParams.processorId}
        defaultOptionName={"经办人"}
        onchange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        value={searchParams.typeId}
        defaultOptionName={"类型"}
        onchange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>重置搜索</Button>
    </Row>
  );
};
