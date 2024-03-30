import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { CONTRACT_ADDRESS } from "../../utils/constant";
import { abi } from "../../assets/abis/todo-list-abi";
import { useWriteTodoContract } from "../../hooks/use-write-todo-contract";

type TaskStatusButtonProps = {
  id: number | undefined;
  isCompleted: boolean;
};

const TaskStatusButton = ({ id, isCompleted }: TaskStatusButtonProps) => {
  const { writeContract, isFetching } = useWriteTodoContract({
    refetchList: true,
  });

  const onTaskStatusChange = () => {
    if (id !== undefined) {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "toggleCompleted",
        args: [BigInt(id)],
      });
    }
  };

  return (
    <LoadingButton
      loading={isFetching}
      onClick={() => onTaskStatusChange()}
      variant="contained"
      size="small"
    >
      {isCompleted ? "To do" : "Complete"}
    </LoadingButton>
  );
};

export default TaskStatusButton;
