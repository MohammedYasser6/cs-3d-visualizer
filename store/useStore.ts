import { create } from "zustand";

interface UserState {
  xp: number;
  level: number;
  completedModules: string[];
  completeModule: (moduleName: string, xpGained: number) => void;
}

export const useStore = create<UserState>((set) => ({
  xp: 0,
  level: 1,
  completedModules: [],

  // This function is our engine. It adds XP, checks for level ups, and prevents double-awarding XP.
  completeModule: (moduleName, xpGained) =>
    set((state) => {
      // If they already completed it, don't give them XP again
      if (state.completedModules.includes(moduleName)) return state;

      const newXp = state.xp + xpGained;
      const newLevel = Math.floor(newXp / 100) + 1; // Level up every 100 XP

      return {
        xp: newXp,
        level: newLevel,
        completedModules: [...state.completedModules, moduleName],
      };
    }),
}));
