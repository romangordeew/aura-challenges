import { useTransactionsSnackbar } from "./use-transactions-snackbar";
import { useLoadTasks } from "./use-load-tasks";
import { useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

type UseWriteTodoContractParams = {
  refetchCount?: boolean;
  refetchList?: boolean;
  onConfirm?: () => void;
};

export const useWriteTodoContract = ({
  refetchCount,
  refetchList,
  onConfirm,
}: UseWriteTodoContractParams) => {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { refetchContractGetsItems, refetchContractGetCount } = useLoadTasks();

  useEffect(() => {
    if (isConfirmed) {
      if (refetchCount) {
        refetchContractGetCount();
      }
      if (refetchList) {
        refetchContractGetsItems();
      }
      onConfirm && onConfirm();
    }
  }, [isConfirmed]);

  useTransactionsSnackbar({ hash, error, isConfirming });

  return { writeContract, isFetching: isPending || isConfirming };
};
