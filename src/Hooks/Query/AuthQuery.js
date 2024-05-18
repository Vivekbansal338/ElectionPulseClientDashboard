import { login } from "../../Services/AuthServices";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: ({ data }) => login(data),
  });
  return { isPending, mutate };
};
