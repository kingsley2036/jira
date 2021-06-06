import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer width={"100%"} onClose={close} visible={projectModalOpen}>
      <h1>lalala</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
