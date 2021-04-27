import { User } from "screens/project-list/search-panel";
import { Table } from "antd";
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      dataSource={list}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          dataIndex: "personId",
          render(value) {
            return (
              <span>
                {users.find((user) => user.id === value)?.name || "未知"}
              </span>
            );
          },
        },
      ]}
    ></Table>
  );
};
