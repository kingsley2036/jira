import { useTasks } from "../../utils/task";
import { Kanban } from "../../types/kanban";
import { useTasksModal, useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../utils/task-type";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import styled from "@emotion/styled";
import { CreateTask } from "./create-task";
import { Task } from "../../types/task";
import { Card } from "antd";
import { Mark } from "../../components/mark";
import React from "react";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";

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

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      key={task.id}
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
    >
      <Mark name={task.name} keyword={keyword} />
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};
export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }: { kanban: Kanban }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container ref={ref} {...props}>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        <Drop
          droppableId={"task" + kanban.id}
          direction={"vertical"}
          type={"ROW"}
        >
          <DropChild>
            {tasks?.map((task, index) => {
              return (
                <Drag
                  draggableId={"task" + task.id}
                  key={task.id}
                  index={index}
                >
                  <div>
                    <TaskCard task={task} />
                  </div>
                </Drag>
              );
            })}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
});

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
