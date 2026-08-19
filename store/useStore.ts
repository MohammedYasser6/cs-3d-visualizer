import { create } from "zustand";
import { persist } from "zustand/middleware"; // Import the persist tool

interface UserState {
  xp: number;
  level: number;
  completedModules: string[];
  completeModule: (moduleName: string, xpGained: number) => void;
}

// Wrap our entire store logic inside persist()
export const useStore = create<UserState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      completedModules: [],

      completeModule: (moduleName, xpGained) =>
        set((state) => {
          if (state.completedModules.includes(moduleName)) return state;

          const newXp = state.xp + xpGained;
          const newLevel = Math.floor(newXp / 100) + 1;

          return {
            xp: newXp,
            level: newLevel,
            completedModules: [...state.completedModules, moduleName],
          };
        }),
    }),
    {
      name: "cs-3d-user-progress", // The name of the file saved in the browser's storage
    },
  ),
);
