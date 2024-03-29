import React from "react";
import { Task } from "../../types/types";
import TaskItem from "../task-item/task-item";
import { Stack } from "@mui/material";

type TasksListProps = {
  tasks: Task[];
};
const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <Stack sx={{ borderTop: "1px solid #334155" }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Stack>
  );
};

export default TasksList;
