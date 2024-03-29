import { Stack, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Task } from "../../types/types";
import TaskStatusButton from "./task-status-button";
import EditTaskForm from "./edit-task-form";

type TaskProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskProps) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Stack
      onDoubleClick={() => setIsEditing(!isEditing)}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ borderBottom: "1px solid #334155" }}
      py={0.5}
    >
      {isEditing ? (
        <EditTaskForm task={task} setIsEditing={setIsEditing} />
      ) : (
        <>
          <Typography
            color={theme.palette.text.secondary}
            fontSize={12}
            fontWeight={400}
          >
            {task.title}
          </Typography>
          <TaskStatusButton isCompleted={task.isCompleted} id={task.id} />
        </>
      )}
    </Stack>
  );
};

export default TaskItem;
