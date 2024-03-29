import { Paper, Stack, styled } from "@mui/material";
import React from "react";
import TodoListHeader from "../components/todo-list-header/todo-list-header";
import TodoListContent from "../components/todo-list-content/todo-list-content";

const TodoList = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <StyledTodoList>
        <TodoListHeader />
        <TodoListContent />
      </StyledTodoList>
    </Stack>
  );
};

export default TodoList;

const StyledTodoList = styled(Paper)({
  margin: 24,
  width: 400,
  minHeight: 300,
  padding: 16,
  borderRadius: 12,
  overflow: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(255, 255, 255, 0.1) transparent",
  scrollbarGutter: "stable",
  "&::-webkit-scrollbar": {
    width: 5,
    height: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255, 255, 255, 0.08)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    cursor: "pointer",
  },
});
