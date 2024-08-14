import {create} from 'zustand';
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  authenticate: (token) => {
    AsyncStorage.setItem('token', token);
    set({ token, isAuthenticated: true })},
  logout: () => {
    AsyncStorage.removeItem('token');
    set({ token: null, isAuthenticated: false })},
}));
