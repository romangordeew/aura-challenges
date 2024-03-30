import React from "react";
import { Task } from "../../types/types";
import TaskItem from "../task-item/task-item";
import { Stack, styled } from "@mui/material";

type TasksListProps = {
  tasks: Task[];
};
const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <StyledTaskList>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </StyledTaskList>
  );
};

export default TasksList;

const StyledTaskList = styled(Stack)({
  borderTop: "1px solid #334155",
});
