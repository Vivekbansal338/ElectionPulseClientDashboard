import { addEmployee, getEmployees } from "../../Services/EmployeeServices";
import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useAddEmployee = () => {
  const token = useSelector((state) => state.auth.token);
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: ({ data }) => addEmployee(token, data),
  });
  return { isPending, mutate, isError, error };
};

export const useGetEmployees = () => {
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
    queryKey: ["employees"],
    queryFn: ({ pageParam = 1 }) => getEmployees(token, pageParam),
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
