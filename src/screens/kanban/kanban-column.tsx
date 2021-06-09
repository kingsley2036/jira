import { useTasks } from "../../utils/task";
import { Kanban } from "../../types/kanban";
import { useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../utils/task-type";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import styled from "@emotion/styled";
const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const typeName = taskTypes?.find((taskType) => id === taskType.id)?.name;
  if (!typeName) {
    return null;
  }
  return (
    <img alt={"task-icon"} src={typeName === "task" ? taskIcon : bugIcon} />
  );
};
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((item) => (item.kanbanId = kanban.id));
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((task) => {
          return (
            <div key={task.id}>
              <div>{task.name}</div>
              <TaskTypeIcon id={task.typeId} />
            </div>
          );
        })}
      </TasksContainer>
    </Container>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
