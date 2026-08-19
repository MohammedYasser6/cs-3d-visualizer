import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-950 text-slate-200 p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Welcome to <span className="text-blue-500">CS 3D Vis</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
          The interactive encyclopedia of Computer Science. Start from the
          absolute hardware fundamentals, or jump straight into 3D memory
          structures.
        </p>
        <Link
          href="/hardware"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition shadow-lg shadow-blue-900/50 text-lg"
        >
          Start Learning →
        </Link>
      </div>
    </div>
  );
}
