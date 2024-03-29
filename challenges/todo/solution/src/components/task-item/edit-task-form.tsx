import React, { useEffect } from "react";
import { Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useLoadTasks } from "../../hooks/use-load-tasks";
import { SubmitHandler, useForm } from "react-hook-form";
import { CONTRACT_ADDRESS } from "../../utils/constant";
import { abi } from "../../assets/abis/todo-list-abi";
import { useTransactionsSnackbar } from "../../hooks/use-transactions-snackbar";
import { Task } from "../../types/types";

type EditTaskFormFields = {
  taskName: string;
};

type EditTaskFormProps = {
  task: Task;
  setIsEditing: (isEditing: boolean) => void;
};

const EditTaskForm = ({ task, setIsEditing }: EditTaskFormProps) => {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const { refetchContractGetsItems: refetchTasksList } = useLoadTasks();

  useEffect(() => {
    if (isConfirmed) {
      refetchTasksList();
      setIsEditing(false);
    }
  }, [isConfirmed]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTaskFormFields>();

  const onSubmit: SubmitHandler<EditTaskFormFields> = (data) => {
    if (task.id) {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "update",
        args: [BigInt(task.id), data.taskName],
      });
    }
  };

  useTransactionsSnackbar({ hash, error, isConfirming });
  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={1} direction="row" justifyContent="space-between">
        <TextField
          sx={{ width: "100%" }}
          size="small"
          label="Task"
          variant="outlined"
          defaultValue={task.title}
          {...register("taskName", { required: true })}
          error={!!errors.taskName}
          helperText={errors.taskName ? "This field is required" : ""}
        />
        <LoadingButton
          loading={isPending || isConfirming}
          variant="contained"
          type="submit"
          size="small"
          sx={{ height: 30 }}
        >
          Save
        </LoadingButton>
        <LoadingButton
          sx={{ height: 30 }}
          size="small"
          disabled={isPending || isConfirming}
          variant="contained"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default EditTaskForm;
