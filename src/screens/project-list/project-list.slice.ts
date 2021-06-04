import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { Project } from "./list";
import { User } from "./search-panel";

interface State {
  projectModalOpen: boolean;
  projects: Project[];
  user: User | null;
}

const initialState: State = {
  projectModalOpen: false,
  projects: [],
  user: null,
};
export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
    setProjectList(state, action) {
      state.projects = action.payload;
    },
  },
});
export const { setProjectList } = projectListSlice.actions;
export const projectListActions = projectListSlice.actions;
export const refreshProjects = (promise: Promise<Project[]>) => (
  dispatch: AppDispatch
) => {
  //异步action
  promise.then((res) => dispatch(setProjectList(res)));
};
export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen; // 类似于vuex的getters
