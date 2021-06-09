import React from "react";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { useKanbans } from "../../utils/kanban";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";

export const KanbanScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <Container>
        {kanbans?.map((kanban) => {
          return <KanbanColumn kanban={kanban} key={kanban.id} />;
        })}
      </Container>
    </div>
  );
};
const Container = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
