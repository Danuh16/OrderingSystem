import { create } from "zustand";
import { persist } from "zustand/middleware";

let appStore = (set) => ({
  dopen: true,
  rows: [], // Add rows state
  setRows: (newRows) => set({ rows: newRows }), // Add setRows function
  updateOpen: (dopen) => set((state) => ({ dopen: dopen })),

  user: [],
  setUser: (users) => set({ user: users }), // Add setRows function

  editUser: (updatedUser) =>
    set((state) => ({
      rows: state.rows.map((user) =>
        user.usename === updatedUser.username ? updatedUser : user
      ),
    })), // Add editUser function

  // Dark mode state and toggle function
  darkMode: false,
  setDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  // Remember me state
  remember: false,
  setRemember: (remember) => set({ remember }),

  username: "",
  setUsername: (username) => set({ username }),

  password: "",
  setPassword: (password) => set({ password }),

  // For waiters order
  //user: null,
  tables: [],
  orders: [],
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setTables: (tables) => set({ tables }),
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
});

appStore = persist(appStore, { name: "my-app-store" });

export const useAppStore = create(appStore);
