import "./globals.css";
import Link from "next/link"; // Import Next.js Link

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
        <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6 flex flex-col z-20">
          <h1 className="text-2xl font-bold text-white mb-8">CS 3D Vis</h1>
          <nav className="flex flex-col gap-2">
            {/* Navigates to the root page (Arrays) */}
            <Link
              href="/"
              className="rounded hover:bg-slate-800 text-slate-300 p-3 transition border border-transparent hover:border-slate-700 block"
            >
              1. Arrays
            </Link>

            {/* Navigates to our new Pointers page */}
            <Link
              href="/pointers"
              className="rounded hover:bg-slate-800 text-slate-300 p-3 transition border border-transparent hover:border-slate-700 block"
            >
              2. Pointers
            </Link>

            <div className="rounded p-3 text-slate-600 bg-slate-900/50 cursor-not-allowed border border-transparent mt-2 text-sm font-medium">
              🔒 3. Linked Lists (Locked)
            </div>
          </nav>
        </aside>

        <div className="flex-1 relative h-full">{children}</div>
      </body>
    </html>
  );
}
