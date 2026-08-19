"use client";

import "./globals.css";
// 1. Import optimized fonts
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";

// 2. Configure the fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { xp, level, completedModules } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLevel2 = level >= 2;
  const isLevel3 = level >= 3;

  return (
    // 3. Apply the fonts globally to the HTML tag
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}
    >
      <body className="flex h-screen w-screen overflow-hidden bg-slate-950 selection:bg-blue-500 selection:text-white">
        {/* SIDEBAR - Added animate-slide-up and subtle gradients */}
        <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col relative z-20 shadow-2xl animate-fade-in">
          <div className="p-6 border-b border-slate-800 bg-gradient-to-b from-slate-800/50 to-transparent">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span className="text-blue-500">CS</span> 3D Vis
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Interactive Encyclopedia
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
            {isMounted && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner animate-slide-up">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">
                  Your Progress
                </p>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-2xl font-bold text-white">Level {level}</p>
                  <p className="text-blue-400 font-medium text-sm">{xp} XP</p>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                    style={{ width: `${xp % 100}%` }}
                  />
                </div>
              </div>
            )}

            <nav
              className="flex flex-col gap-6 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">
                  Tier 0: Fundamentals
                </h3>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/hardware"
                    className={`rounded p-3 transition border block ${completedModules.includes("hardware") ? "border-green-500/30 text-green-400 bg-green-500/5" : "hover:bg-slate-800 text-slate-300 border-transparent"}`}
                  >
                    1. Hardware & Memory{" "}
                    {completedModules.includes("hardware") && "✓"}
                  </Link>
                  <Link
                    href="/programming"
                    className={`rounded p-3 transition border block ${completedModules.includes("programming") ? "border-green-500/30 text-green-400 bg-green-500/5" : "hover:bg-slate-800 text-slate-300 border-transparent"}`}
                  >
                    2. Programming 101{" "}
                    {completedModules.includes("programming") && "✓"}
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">
                  Tier 1: Linear
                </h3>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/arrays"
                    className={`rounded p-3 transition border block ${completedModules.includes("arrays") ? "border-green-500/30 text-green-400 bg-green-500/5" : "hover:bg-slate-800 text-slate-300 border-transparent"}`}
                  >
                    3. Arrays {completedModules.includes("arrays") && "✓"}
                  </Link>
                  <Link
                    href="/pointers"
                    className={`rounded p-3 transition border block ${completedModules.includes("pointers") ? "border-green-500/30 text-green-400 bg-green-500/5" : "hover:bg-slate-800 text-slate-300 border-transparent"}`}
                  >
                    4. Pointers {completedModules.includes("pointers") && "✓"}
                  </Link>
                  {isLevel2 ? (
                    <>
                      <Link
                        href="/linked-lists"
                        className={`rounded p-3 transition border block font-medium ${completedModules.includes("linked-lists") ? "border-green-500/30 text-green-400 bg-green-500/5" : "hover:bg-slate-800 text-blue-400 border-transparent"}`}
                      >
                        5. Linked Lists{" "}
                        {completedModules.includes("linked-lists") && "✓"}
                      </Link>
                      <Link
                        href="/stacks-queues"
                        className={`rounded p-3 transition border block font-medium ${completedModules.includes("stacks-queues") ? "border-green-500/30 text-green-400 bg-green-500/5" : "hover:bg-slate-800 text-amber-500 border-transparent"}`}
                      >
                        6. Stacks & Queues{" "}
                        {completedModules.includes("stacks-queues") && "✓"}
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="rounded p-3 text-slate-600 bg-slate-900/50 cursor-not-allowed border border-transparent text-sm font-medium">
                        🔒 5. Linked Lists (Reach Lv.2)
                      </div>
                      <div className="rounded p-3 text-slate-600 bg-slate-900/50 cursor-not-allowed border border-transparent text-sm font-medium">
                        🔒 6. Stacks & Queues (Reach Lv.2)
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">
                  Tier 2: Non-Linear
                </h3>
                <div className="flex flex-col gap-1">
                  {isLevel3 ? (
                    <Link
                      href="/trees"
                      className={`rounded p-3 transition border block font-medium ${completedModules.includes("trees") ? "border-green-500/30 text-green-400 bg-green-500/5" : "hover:bg-slate-800 text-emerald-400 border-transparent"}`}
                    >
                      7. AVL Trees {completedModules.includes("trees") && "✓"}
                    </Link>
                  ) : (
                    <div className="rounded p-3 text-slate-600 bg-slate-900/50 cursor-not-allowed border border-transparent text-sm font-medium">
                      🔒 7. AVL Trees (Reach Lv.3)
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT AREA - animate-fade-in */}
        <main className="flex-1 relative z-10 bg-slate-950 animate-fade-in">
          {children}
        </main>
      </body>
    </html>
  );
}
