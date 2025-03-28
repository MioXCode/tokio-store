import { useMutation } from "@tanstack/react-query";
import { AuthFormValues } from "@/interfaces/auth";
import { createApiClient } from "@/lib/fetcher";

const api = createApiClient("https://fakestoreapi.com");

interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export const useAuth = () => {
  const loginMutation = useMutation<LoginResponse, Error, AuthFormValues>({
    mutationFn: async (credentials: AuthFormValues) => {
      const data = await api.post<LoginResponse>("/auth/login", {
        username: credentials.username,
        password: credentials.password,
      });
      
      localStorage.setItem("authToken", data.token);
      
      return data;
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Login error:", error.stack);
    },
  });

  const login = (credentials: AuthFormValues) => {
    return loginMutation.mutate(credentials);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  return { 
    login,
    logout,
    isAuthenticated,
    isLoading: loginMutation.isPending
  };
};