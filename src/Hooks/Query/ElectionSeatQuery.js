import {
  addSeat,
  removeSeat,
  getAvailableSeatsByElectionId,
  getSelectedSeatsByElectionId,
  getAvailableEmployees,
  getAvailableParties,
  addPartyToSeat,
  removePartyFromSeat,
  addEmployeeToSeat,
  removeEmployeeFromSeat,
} from "../../Services/ElectionSeatServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useAddSeat = () => {
  const token = useSelector((state) => state.auth.token);
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: ({ data }) => addSeat(token, data),
  });
  return { mutate, isPending, isError, error, reset };
};

export const useRemoveSeat = () => {
  const token = useSelector((state) => state.auth.token);
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: ({ data }) => removeSeat(token, data),
  });
  return { mutate, isPending, isError, error, reset };
};

export const useGetAvailableSeatsByElectionId = (
  showAvailable,
  id,
  seatType,
  state
) => {
  const token = useSelector((state) => state.auth.token);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["availableseatsbyelectionid", id, seatType, state],
    queryFn: () => getAvailableSeatsByElectionId(token, id, seatType, state),
    enabled: !!showAvailable,
  });
  return { data, isPending, isError, error };
};

export const useGetSelectedSeatsByElectionId = (
  showSelected,
  id,
  seatType,
  state
) => {
  const token = useSelector((state) => state.auth.token);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["selectedseatsbyelectionid", id, seatType, state],
    queryFn: () => getSelectedSeatsByElectionId(token, id, seatType, state),
    enabled: !!showSelected,
  });
  return { data, isPending, isError, error };
};

export const useGetAvailableParties = (showParties, id) => {
  const token = useSelector((state) => state.auth.token);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["availableparties", id],
    queryFn: () => getAvailableParties(token, id),
    enabled: !!showParties,
  });
  return { data, isPending, isError, error };
};

export const useAddPartyToSeat = () => {
  const token = useSelector((state) => state.auth.token);
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: ({ data }) => addPartyToSeat(token, data),
  });
  return { mutate, isPending, isError, error, reset };
};

export const useRemovePartyFromSeat = () => {
  const token = useSelector((state) => state.auth.token);
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: ({ data }) => removePartyFromSeat(token, data),
  });
  return { mutate, isPending, isError, error, reset };
};

export const useGetAvailableEmployees = (showEmployees, id) => {
  const token = useSelector((state) => state.auth.token);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["availableemployees", id],
    queryFn: () => getAvailableEmployees(token, id),
    enabled: !!showEmployees,
  });
  return { data, isPending, isError, error };
};

export const useAddEmployeeToSeat = () => {
  const token = useSelector((state) => state.auth.token);
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: ({ data }) => addEmployeeToSeat(token, data),
  });
  return { mutate, isPending, isError, error, reset };
};

export const useRemoveEmployeeFromSeat = () => {
  const token = useSelector((state) => state.auth.token);
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: ({ data }) => removeEmployeeFromSeat(token, data),
  });
  return { mutate, isPending, isError, error, reset };
};
