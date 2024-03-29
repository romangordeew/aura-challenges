import React, { useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useLoadTasks } from "../../hooks/use-load-tasks";
import { CONTRACT_ADDRESS } from "../../utils/constant";
import { abi } from "../../assets/abis/todo-list-abi";
import { useTransactionsSnackbar } from "../../hooks/use-transactions-snackbar";

type TaskStatusButtonProps = {
  id: number | undefined;
  isCompleted: boolean;
};

const TaskStatusButton = ({ id, isCompleted }: TaskStatusButtonProps) => {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { refetchContractGetsItems } = useLoadTasks();

  useEffect(() => {
    if (isConfirmed) {
      refetchContractGetsItems();
    }
  }, [isConfirmed]);

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

  useTransactionsSnackbar({ hash, error, isConfirming });

  return (
    <LoadingButton
      loading={isPending || isConfirming}
      onClick={() => onTaskStatusChange()}
      variant="contained"
      size="small"
    >
      {isCompleted ? "To do" : "Complete"}
    </LoadingButton>
  );
};

export default TaskStatusButton;
