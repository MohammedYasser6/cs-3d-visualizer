import Link from "next/link";

export default function HardwareTheoryPage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-slate-950 text-slate-300 p-10 md:p-20">
      {/* Max width wrapper for optimal reading experience */}
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-3">
            Module 1
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Inside the Machine
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Before we write any code, we need to understand the physical world
            where our code lives. Your computer is essentially a highly
            organized factory.
          </p>
        </header>

        {/* Content Cards */}
        <div className="space-y-8">
          {/* CPU Card */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-3xl">🧠</span> The CPU (Central Processing
              Unit)
            </h2>
            <p className="leading-relaxed mb-4">
              The CPU is the brain of the factory. It reads your code and
              executes mathematical instructions one by one. It is incredibly
              fast but has almost no memory of its own. It relies on other parts
              of the computer to hand it information to process.
            </p>
          </section>

          {/* RAM Card */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-3xl">⚡</span> RAM (Random Access Memory)
            </h2>
            <p className="leading-relaxed mb-4">
              RAM is your computer's short-term working memory. Think of it like
              a massive whiteboard next to the CPU. When you create an Array or
              a Variable in your code, you are drawing it on this whiteboard so
              the CPU can access it instantly.
            </p>
            <div className="bg-slate-950 rounded p-4 border border-slate-800 text-sm text-slate-400">
              <strong className="text-red-400">Important:</strong> RAM is
              volatile. If you turn off the power, the whiteboard is wiped
              completely clean.
            </div>
          </section>

          {/* Storage Card */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-3xl">🗄️</span> Storage (SSD / HDD)
            </h2>
            <p className="leading-relaxed">
              This is the long-term filing cabinet. It is much slower than RAM,
              but it keeps your data safe even when the power is off. When you
              double-click a video game or a program, the computer copies the
              files from the slow Storage into the fast RAM so the CPU can play
              it.
            </p>
          </section>
        </div>

        {/* Navigation / Quiz Button */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center pb-20">
          <p className="text-slate-500">End of Theory Section</p>

          {/* This button will eventually link to the separate quiz page for this module */}
          <Link
            href="/hardware/quiz"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg shadow-blue-900/50"
          >
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
