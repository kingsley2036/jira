import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { UserSelect } from "../../components/user-select";
import { useAddProjects, useEditProjects } from "../../utils/project";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { ErrorBox } from "../../components/lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading,
  } = useProjectModal();
  const title = editingProject ? "编辑项目" : "创建项目";
  const useMutateProject = editingProject ? useEditProjects : useAddProjects;
  const queryKey = useProjectsQueryKey();
  const { isLoading: mutateLoading, mutateAsync, error } = useMutateProject(
    queryKey
  );
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };
  const closeModal = () => {
    form.resetFields();
    close();
  };
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender={true}
      width={"100%"}
      onClose={closeModal}
      visible={projectModalOpen}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              layout={"vertical"}
              form={form}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder={"请输入项目名"} />
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请部门名" }]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>
              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
