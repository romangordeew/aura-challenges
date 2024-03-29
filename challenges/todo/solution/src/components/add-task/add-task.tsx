import React, { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../../utils/constant";
import { abi } from "../../assets/abis/todo-list-abi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoadTasks } from "../../hooks/use-load-tasks";
import { useTransactionsSnackbar } from "../../hooks/use-transactions-snackbar";

type AddTaskForm = {
  taskName: string;
};

const AddTask = () => {
  const [showForm, setShowForm] = useState(false);

  const { refetchContractGetCount: refetchTasksList } = useLoadTasks();

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      refetchTasksList();
    }
  }, [isConfirmed]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskForm>();

  const onSubmit: SubmitHandler<AddTaskForm> = (data) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "create",
      args: [data.taskName],
    });
  };

  useTransactionsSnackbar({ hash, error, isConfirming });

  return (
    <Stack direction="row" justifyContent="flex-end" mt={1} gap={1}>
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Stack gap={1} direction="row">
            <TextField
              sx={{ width: "100%" }}
              size="small"
              label="Task"
              variant="outlined"
              {...register("taskName", { required: true })}
              error={!!errors.taskName}
              helperText={errors.taskName ? "This field is required" : ""}
            />
            <LoadingButton
              sx={{ height: 30 }}
              loading={isPending || isConfirming}
              variant="contained"
              type="submit"
              size="small"
            >
              Add
            </LoadingButton>
          </Stack>
        </form>
      )}
      <LoadingButton
        sx={{ height: 30 }}
        size="small"
        variant="contained"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "-" : "+"}
      </LoadingButton>
    </Stack>
  );
};

export default AddTask;
