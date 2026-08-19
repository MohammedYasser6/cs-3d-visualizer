"use client"; // Required because we are reading global state now

import "./globals.css";
import Link from "next/link";
import { useStore } from "../store/useStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read our global state
  const { xp, level, completedModules } = useStore();

  // Calculate XP progress towards the next level (0 to 100)
  const xpProgress = xp % 100;
  const isLevel2 = level >= 2;

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="flex h-screen w-full bg-slate-950 text-slate-200 overflow-hidden"
      >
        <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6 flex flex-col z-20">
          <h1 className="text-2xl font-bold text-white mb-6">CS 3D Vis</h1>

          {/* USER PROFILE CARD */}
          <div className="bg-slate-800/50 rounded-xl p-4 mb-8 border border-slate-700/50">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm text-slate-400 font-medium">
                Developer
              </span>
              <span className="text-lg font-bold text-blue-400">
                Lv. {level}
              </span>
            </div>
            {/* XP Bar */}
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700 ease-out"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="text-right text-xs text-slate-500 mt-1">
              {xpProgress} / 100 XP
            </p>
          </div>

          <nav className="flex flex-col gap-4">
            {/* TIER 0: FUNDAMENTALS */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">
                Tier 0: Fundamentals
              </h3>
              <div className="flex flex-col gap-1">
                {/* Updated Hardware Link to show completion checkmark */}
                <Link
                  href="/hardware"
                  className={`rounded p-3 transition border block ${completedModules.includes("hardware") ? "border-green-500/30 text-green-400" : "hover:bg-slate-800 text-slate-300 border-transparent"}`}
                >
                  1. Hardware & Memory{" "}
                  {completedModules.includes("hardware") && "✓"}
                </Link>

                <div className="rounded p-3 text-slate-600 bg-slate-900/50 cursor-not-allowed border border-transparent text-sm font-medium">
                  🔒 2. Programming 101
                </div>
              </div>
            </div>

            {/* TIER 1: DATA STRUCTURES */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">
                Tier 1: Data Structures
              </h3>
              <div className="flex flex-col gap-1">
                <Link
                  href="/"
                  className={`rounded p-3 transition border block ${completedModules.includes("arrays") ? "border-green-500/30 text-green-400" : "hover:bg-slate-800 text-slate-300 border-transparent"}`}
                >
                  3. Arrays {completedModules.includes("arrays") && "✓"}
                </Link>
                <Link
                  href="/pointers"
                  className={`rounded p-3 transition border block ${completedModules.includes("pointers") ? "border-green-500/30 text-green-400" : "hover:bg-slate-800 text-slate-300 border-transparent"}`}
                >
                  4. Pointers {completedModules.includes("pointers") && "✓"}
                </Link>
              </div>
            </div>
          </nav>
        </aside>

        <div className="flex-1 relative h-full">{children}</div>
      </body>
    </html>
  );
}
