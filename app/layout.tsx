import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="flex h-screen w-full bg-slate-950 text-slate-200 overflow-hidden"
      >
        {/* GLOBAL SIDEBAR: This will now appear on every single page automatically */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6 flex flex-col z-20">
          <h1 className="text-2xl font-bold text-white mb-8">CS 3D Vis</h1>
          <nav className="flex flex-col gap-2">
            {/* Later, we will use Next.js <Link> tags here to route to different modules */}
            <div className="rounded bg-blue-600/20 text-blue-400 p-3 font-semibold border border-blue-500/30 shadow-sm cursor-pointer">
              1. Arrays
            </div>
            <div className="rounded p-3 text-slate-500 bg-slate-900/50 cursor-not-allowed border border-transparent">
              🔒 2. Pointers (Locked)
            </div>
            <div className="rounded p-3 text-slate-500 bg-slate-900/50 cursor-not-allowed border border-transparent">
              🔒 3. Linked Lists (Locked)
            </div>
          </nav>
        </aside>

        {/* DYNAMIC PAGE CONTENT: This is where page.tsx gets injected */}
        <div className="flex-1 relative h-full">{children}</div>
      </body>
    </html>
  );
}
