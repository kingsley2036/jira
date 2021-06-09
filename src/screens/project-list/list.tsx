import React from "react";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useDeleteProjects, useEditProjects } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { Project } from "../../types/project";
import { User } from "../../types/user";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const queryKey = useProjectsQueryKey();
  const { mutate } = useEditProjects(queryKey);

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={(pin) => {
                  mutate({ id: project.id, pin });
                }}
              />
            );
          },
        },
        {
          title: "名称",
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return EditOptions(project);
          },
        },
      ]}
      {...props}
    />
  );
};
const EditOptions = (project: Project) => {
  const queryKey = useProjectsQueryKey();
  const { mutate: deleteProject } = useDeleteProjects(queryKey);
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => startEdit(id);
  const confirmDelete = (project: Project) => {
    return Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject(project);
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"}>
            <ButtonNoPadding
              type={"link"}
              onClick={() => {
                editProject(project.id);
              }}
            >
              编辑
            </ButtonNoPadding>
          </Menu.Item>
          <Menu.Item key={"delete"}>
            <ButtonNoPadding
              type={"link"}
              onClick={() => {
                confirmDelete(project);
              }}
            >
              删除
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
