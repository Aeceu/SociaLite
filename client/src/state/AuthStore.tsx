/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "../api/axios";
interface AuthStoreProps {
  userData: UserDataProps | null;
  handleSignUp: (formData: SignUpProps) => Promise<HandleReturnProps>;
  handleLogin: (formData: LoginProps) => Promise<HandleReturnProps>;
  handleLogout: () => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
  success: string;
  setSuccess: (success: string) => void;
}

export const AuthStore = create<AuthStoreProps>((set, get) => ({
  userData: null,
  loading: false,
  error: "",
  success: "",
  setError: (error: string) => {
    set({ error: error });
  },
  setSuccess: (success: string) => {
    set({ success: success });
  },
  setLoading: (loading: boolean) => {
    set({ loading: loading });
  },
  handleSignUp: async (formData: SignUpProps) => {
    try {
      get().setLoading(true);
      const res = await axios.post("/api/v1/signup", formData);
      get().setSuccess(res.data.message);
      return {
        data: res.data,
        error: null,
      };
    } catch (error: any) {
      get().setError(error.response.data.error);
      return {
        data: null,
        error: error.response.data.error,
      };
    } finally {
      get().setLoading(false);
    }
  },
  handleLogin: async (formData: LoginProps) => {
    try {
      get().setLoading(true);
      const res = await axios.post("/api/v1/login", formData);
      get().setSuccess(res.data.message);
      return {
        data: res.data,
        error: null,
      };
    } catch (error: any) {
      get().setError(error.response.data.error);
      return {
        data: null,
        error: error.response.data.error,
      };
    } finally {
      get().setLoading(false);
    }
  },
  handleLogout: async () => {
    try {
      await axios.get("/api/v1/logout").then(() => {
        console.log("User logout!");
      });
    } catch (error: any) {
      console.log(error);
    }
  },
}));
