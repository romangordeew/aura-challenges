import { Stack, styled, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { Task } from "../../types/types";
import TaskStatusButton from "./task-status-button";
import EditTaskForm from "./edit-task-form";

type TaskProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <StyledTaskItem onDoubleClick={() => setIsEditing(!isEditing)}>
      {isEditing ? (
        <EditTaskForm task={task} setIsEditing={setIsEditing} />
      ) : (
        <>
          <Tooltip title="Double click to edit">
            <Stack width="100%">
              <StyledTaskTitle>{task.title}</StyledTaskTitle>
            </Stack>
          </Tooltip>

          <TaskStatusButton isCompleted={task.isCompleted} id={task.id} />
        </>
      )}
    </StyledTaskItem>
  );
};

export default TaskItem;

const StyledTaskItem = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #334155",
  paddingTop: 4,
  paddingBottom: 3,
  cursor: "pointer",
});

const StyledTaskTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 12,
  fontWeight: 400,
}));
