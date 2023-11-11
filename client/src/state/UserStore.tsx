import { create } from "zustand";
import axios from "../api/axios";

interface UserStoreProps {
  userProfile: UserDataProps | null;
  user: UserDataProps | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  getUserData: () => Promise<void>;
  HandleUpdateUserData: ({
    id,
    formData,
  }: updateInfoProps) => Promise<HandleReturnProps>;
  HandleGetUserProfileData: (id: string) => Promise<void>;
}

export const UserStore = create<UserStoreProps>((set, get) => ({
  userProfile: null,
  user: null,
  loading: false,
  setLoading: (loading: boolean) => {
    set({ loading: loading });
  },
  getUserData: async () => {
    try {
      const res = await axios.get("/api/v1/getdata");
      set({ user: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  HandleGetUserProfileData: async (id: string) => {
    try {
      const res = await axios.get(`/api/v1/userdata/${id}`);
      set({ userProfile: res.data.userdata });
    } catch (error) {
      console.log(error);
    }
  },
  HandleUpdateUserData: async ({ id, formData }) => {
    try {
      get().setLoading(true);
      const res = await axios.patch(`/api/v1/user/${id}`, formData);
      console.log(res.data);
      return {
        data: res.data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.response.data.error,
      };
    } finally {
      get().setLoading(false);
    }
  },
}));
