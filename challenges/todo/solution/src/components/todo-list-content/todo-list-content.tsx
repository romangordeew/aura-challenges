import React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useLoadTasks } from "../../hooks/use-load-tasks";
import TasksList from "../tasks-list/tasks-list";
import { useAccount } from "wagmi";
import { useAppSelector } from "../../store/store";
import AddTask from "../add-task/add-task";

const TodoListContent = () => {
  const account = useAccount();
  const { isLoading } = useLoadTasks();

  const tasks = useAppSelector((state) => state.tasks);

  return (
    <Stack>
      {isLoading ? (
        <Stack
          width="100%"
          height={250}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Stack>
      ) : account.isConnected ? (
        <Stack>
          <Typography mt={2} mb={1} fontSize={22}>
            To do:
          </Typography>
          <TasksList tasks={tasks.todo} />
          <AddTask />

          <Typography mt={2} mb={1} fontSize={22}>
            Completed:
          </Typography>
          <TasksList tasks={tasks.completed} />
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default TodoListContent;
