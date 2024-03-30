import React from "react";
import { Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { CONTRACT_ADDRESS } from "../../utils/constant";
import { abi } from "../../assets/abis/todo-list-abi";
import { Task } from "../../types/types";
import { useWriteTodoContract } from "../../hooks/use-write-todo-contract";

type EditTaskFormFields = {
  taskName: string;
};

type EditTaskFormProps = {
  task: Task;
  setIsEditing: (isEditing: boolean) => void;
};

const EditTaskForm = ({ task, setIsEditing }: EditTaskFormProps) => {
  const onConfirm = () => {
    setIsEditing(false);
  };

  const { writeContract, isFetching } = useWriteTodoContract({
    refetchList: true,
    onConfirm,
  });

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
          loading={isFetching}
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
          disabled={isFetching}
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
