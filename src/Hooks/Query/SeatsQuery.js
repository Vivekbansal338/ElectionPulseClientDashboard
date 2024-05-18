import { getAllSeats } from "../../Services/SeatsServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetAllSeats = () => {
  const token = useSelector((state) => state.auth.token);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["allseats"],
    queryFn: () => getAllSeats(token),
  });
  return { data, isPending, isError, error };
};
