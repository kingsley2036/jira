import React from "react";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { useKanbans } from "../../utils/kanban";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";

export const KanbanScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        <ColumnsContainer>
          <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"}>
            <DropChild style={{ display: "flex " }}>
              {kanbans?.map((kanban, index) => {
                return (
                  <Drag
                    draggableId={"kanban" + kanban.id}
                    key={kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} />
                  </Drag>
                );
              })}
            </DropChild>
          </Drop>
          <CreateKanban />
        </ColumnsContainer>
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};
const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
