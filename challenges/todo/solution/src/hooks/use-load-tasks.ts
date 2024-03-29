import { useEffect, useMemo } from "react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { abi } from "../assets/abis/todo-list-abi";
import { CONTRACT_ADDRESS } from "../utils/constant";
import _ from "lodash";
import { useAppDispatch } from "../store/store";
import { setTasks } from "../store/tasks-slice";
import { Task } from "../types/types";

export const useLoadTasks = () => {
  const dispatch = useAppDispatch();
  const account = useAccount();

  const readContractGetCount = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "getCount",
    args: [account.address!],
    query: { enabled: !!account.address },
  });

  const countOfTasks = Number(readContractGetCount?.data);

  const itemsFunctionContractData = {
    abi,
    address: "0xb03a1dd84d6d761de226CfaCf2a309F674c7ee87",
    functionName: "items",
  } as const;

  const contracts = useMemo(() => {
    if (!countOfTasks || !account.address) return [];

    const contractsArray = _.times(countOfTasks, (i) => ({
      ...itemsFunctionContractData,
      args: [account.address, BigInt(i)],
    }));

    return [...contractsArray];
  }, [countOfTasks, account.address]);

  const readContractGetItems = useReadContracts({
    contracts,
    query: {
      enabled: !!account.address && !!countOfTasks && !!contracts?.length,
    },
  });

  const tasks = useMemo(
    () =>
      (readContractGetItems.data || []).reduce(
        (acc: { completed: Task[]; todo: Task[] }, task, i) => {
          if (task && task.result) {
            const { title, isCompleted, id } = {
              title: task.result[0],
              isCompleted: task.result[1],
              id: i,
            };

            if (isCompleted) {
              acc.completed.push({ title, isCompleted, id });
            } else {
              acc.todo.push({ title, isCompleted, id });
            }
          }
          return acc;
        },
        { completed: [], todo: [] },
      ),
    [JSON.stringify(readContractGetItems.data)],
  );

  useEffect(() => {
    dispatch(setTasks(tasks));
  }, [JSON.stringify(tasks)]);

  return {
    refetchContractGetCount: readContractGetCount.refetch,
    refetchContractGetsItems: readContractGetItems.refetch,
    isLoading: readContractGetCount.isLoading || readContractGetItems.isLoading,
  };
};
