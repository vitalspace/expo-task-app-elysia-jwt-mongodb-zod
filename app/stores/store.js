import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (userData) => {
    await AsyncStorage.setItem("token", JSON.stringify(userData));
    set({ isAuthenticated: true, user: userData });
  },
  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ isAuthenticated: false, user: null });
  },
  checkAuth: async () => {
    const user = await AsyncStorage.getItem("token");
    if (user) {
      set({ isAuthenticated: true, user: JSON.parse(user) });
    }
  },
}));

export default useAuthStore;
