import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects } = useProjects();
  const pinProjects = projects?.filter((project) => project.pin);
  const content = () => {
    return (
      <ContentContainer>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        <List>
          {pinProjects?.map((item) => {
            return (
              <List.Item key={item.id}>
                <List.Item.Meta title={item.name} />
              </List.Item>
            );
          })}
        </List>
        <Divider />
        <ButtonNoPadding onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </ButtonNoPadding>
      </ContentContainer>
    );
  };
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};
const ContentContainer = styled.div`
  min-width: 30rem;
`;
