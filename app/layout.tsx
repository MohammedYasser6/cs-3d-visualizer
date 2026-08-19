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

          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className={`rounded p-3 transition border block ${completedModules.includes("arrays") ? "border-green-500/30 text-green-400" : "hover:bg-slate-800 text-slate-300 border-transparent"}`}
            >
              1. Arrays {completedModules.includes("arrays") && "✓"}
            </Link>

            <Link
              href="/pointers"
              className={`rounded p-3 transition border block ${completedModules.includes("pointers") ? "border-green-500/30 text-green-400" : "hover:bg-slate-800 text-slate-300 border-transparent"}`}
            >
              2. Pointers {completedModules.includes("pointers") && "✓"}
            </Link>

            {/* DYNAMIC LOCK: Opens when Level 2 is reached */}
            {isLevel2 ? (
              <div className="rounded hover:bg-slate-800 text-slate-300 p-3 transition border border-transparent cursor-pointer block font-bold text-blue-400">
                3. Linked Lists (New!)
              </div>
            ) : (
              <div className="rounded p-3 text-slate-600 bg-slate-900/50 cursor-not-allowed border border-transparent mt-2 text-sm font-medium">
                🔒 3. Linked Lists (Reach Lv.2)
              </div>
            )}
          </nav>
        </aside>

        <div className="flex-1 relative h-full">{children}</div>
      </body>
    </html>
  );
}
