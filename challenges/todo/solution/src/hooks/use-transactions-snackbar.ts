import { useSnackbar } from "notistack";
import { BaseError } from "wagmi";
import { useEffect } from "react";

type TransactionsSnackbarProps = {
  hash: `0x${string}` | undefined;
  isConfirming: boolean;
  error: any;
};

export const useTransactionsSnackbar = ({
  hash,
  error,
  isConfirming,
}: TransactionsSnackbarProps) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (hash) {
      enqueueSnackbar(`Transaction Hash: ${hash}`, { variant: "info" });
    }
    if (isConfirming) {
      enqueueSnackbar("Waiting for confirmation...", { variant: "info" });
    }
    if (error) {
      enqueueSnackbar(
        `Error: ${(error as BaseError).shortMessage || error.message}`,
        { variant: "error" },
      );
    }
  }, [hash, error, isConfirming]);
};
