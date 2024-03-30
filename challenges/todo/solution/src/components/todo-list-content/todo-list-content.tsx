import React from "react";
import { CircularProgress, Stack, styled, Typography } from "@mui/material";
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
        <ProgressStack>
          <CircularProgress />
        </ProgressStack>
      ) : account.isConnected ? (
        <Stack>
          <TodoListHeader>To do:</TodoListHeader>
          <TasksList tasks={tasks.todo} />
          <AddTask />

          {!!tasks.completed?.length && (
            <>
              <TodoListHeader>Completed:</TodoListHeader>
              <TasksList tasks={tasks.completed} />
            </>
          )}
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default TodoListContent;

const TodoListHeader = styled(Typography)({
  marginTop: 16,
  marginBottom: 8,
  fontSize: 22,
});

const ProgressStack = styled(Stack)({
  width: "100%",
  height: 250,
  alignItems: "center",
  justifyContent: "center",
});
