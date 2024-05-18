import { getElectionStatus } from "../../Services/ElectionByIdServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetElectionStatus = () => {
  const token = useSelector((state) => state.auth.token);
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: ({ data }) => getElectionStatus(token, data.id),
  });
  return { mutate, isPending, isError, error, reset };
};
