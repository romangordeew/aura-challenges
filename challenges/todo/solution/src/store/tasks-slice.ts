import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/types";

export interface tasksState {
  completed: Task[];
  todo: Task[];
}

const initialState: tasksState = {
  completed: [],
  todo: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (
      state,
      action: PayloadAction<{ completed: Task[]; todo: Task[] }>,
    ) => {
      state.completed = action.payload.completed;
      state.todo = action.payload.todo;
    },
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
