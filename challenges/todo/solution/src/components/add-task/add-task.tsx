import React, { useState } from "react";
import { Stack, styled, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { CONTRACT_ADDRESS } from "../../utils/constant";
import { abi } from "../../assets/abis/todo-list-abi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useWriteTodoContract } from "../../hooks/use-write-todo-contract";

type AddTaskForm = {
  taskName: string;
};

const AddTask = () => {
  const [showForm, setShowForm] = useState(false);

  const { writeContract, isFetching } = useWriteTodoContract({
    refetchCount: true,
  });

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

  return (
    <StyledAddTask>
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
              loading={isFetching}
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
        disabled={isFetching}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "-" : "+"}
      </LoadingButton>
    </StyledAddTask>
  );
};

export default AddTask;

const StyledAddTask = styled(Stack)({
  flexDirection: "row",
  justifyContent: "flex-end",
  marginTop: 8,
  gap: 8,
});
