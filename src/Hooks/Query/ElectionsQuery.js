import {
  createElection,
  getElections,
  changeElectionStatus,
  getSeatOverviewByElection,
  getElectionById,
  updateElection,
} from "../../Services/ElectionsServices";
import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useCreateElection = () => {
  const token = useSelector((state) => state.auth.token);
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: ({ data }) => createElection(token, data),
  });
  return { isPending, mutate, isError, error };
};

export const useElections = () => {
  const token = useSelector((state) => state.auth.token);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["elections"],
    queryFn: () => getElections(token),
  });
  return { data, isPending, isError, error };
};

export const useElectionById = (id) => {
  const token = useSelector((state) => state.auth.token);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["electionById", id],
    queryFn: () => getElectionById(token, id),
  });
  return { data, isPending, isError, error };
};

export const useUpdateElection = () => {
  const token = useSelector((state) => state.auth.token);
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: ({ data }) => updateElection(token, data),
  });
  return { isPending, mutate, isError, error };
};

export const useChangeElectionStatus = () => {
  const token = useSelector((state) => state.auth.token);
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: ({ data }) => changeElectionStatus(token, data),
  });
  return { isPending, mutate, isError, error };
};

export const useSeatOverviewByElection = (id) => {
  const token = useSelector((state) => state.auth.token);
  const {
    data,
    isError,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["SeatOverviewByElection", id],
    queryFn: ({ pageParam = 1 }) =>
      getSeatOverviewByElection(token, id, pageParam),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  return {
    data,
    isError,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
