import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Stack } from "@mui/material";
import { useAccount } from "wagmi";

const TodoListHeader = () => {
  const account = useAccount();

  return (
    <Stack
      sx={
        account?.address
          ? { paddingBottom: 1, alignItems: "flex-end", direction: "row" }
          : {
              width: "100%",
              height: "100%",
              direction: "row",
              justifyContent: "center",
              alignItems: "center",
            }
      }
    >
      <ConnectButton />
    </Stack>
  );
};

export default TodoListHeader;
