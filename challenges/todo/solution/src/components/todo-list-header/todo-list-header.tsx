import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Stack, styled } from "@mui/material";
import { useAccount } from "wagmi";

const TodoListHeader = () => {
  const account = useAccount();

  return (
    <TodoListHeaderStack is_account={!!account.address}>
      <ConnectButton />
    </TodoListHeaderStack>
  );
};

export default TodoListHeader;

export const TodoListHeaderStack = styled(Stack)<{ is_account: boolean }>(
  ({ is_account }) => ({
    paddingBottom: is_account ? 1 : 0,
    alignItems: is_account ? "flex-end" : "center",
    flexDirection: "row",
    justifyContent: is_account ? "flex-end" : "center",
    width: is_account ? "auto" : "100%",
    height: is_account ? "auto" : "100%",
  }),
);
