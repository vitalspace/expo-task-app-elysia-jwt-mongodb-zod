import { create } from "zustand";
import { profile } from "../services/user.services";

const createProfileStore = create((set) => ({
  profile: null,

  initialize: async () => {
    try {
      const { data } = await profile();
      set({ profile: data });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message || "Unknown error");
      }
    }
  },

  updateProfile: async (body) => {
    set({ profile: body });
  },
}));

export default createProfileStore;
