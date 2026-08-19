import Link from "next/link";

export default function HardwareTheoryPage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-slate-950 text-slate-300 p-10 md:p-20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-3">
            Tier 0 • Module 1
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

        <div className="space-y-8">
          {/* CPU Card */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3 h-48 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
                alt="CPU Processor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">🧠</span> The CPU
              </h2>
              <p className="leading-relaxed">
                The Central Processing Unit is the brain of the factory. It
                reads your code and executes mathematical instructions one by
                one. It is incredibly fast but has almost no memory of its own.
                It relies on other parts of the computer to hand it information.
              </p>
            </div>
          </section>

          {/* RAM Card */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col md:flex-row-reverse">
            <div className="md:w-1/3 h-48 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=800"
                alt="RAM Sticks"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">⚡</span> RAM (Memory)
              </h2>
              <p className="leading-relaxed mb-4">
                Random Access Memory is your computer's short-term workspace.
                Think of it like a massive whiteboard next to the CPU. When you
                create an Array or a Variable in your code, you are drawing it
                here so the CPU can access it instantly.
              </p>
              <div className="bg-slate-950 rounded p-4 border border-slate-800 text-sm text-slate-400">
                <strong className="text-red-400">Important:</strong> RAM is
                volatile. If you turn off the power, everything is wiped
                completely clean.
              </div>
            </div>
          </section>

          {/* Storage Card */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3 h-48 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=800"
                alt="Computer Storage"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">🗄️</span> Storage (SSD / HDD)
              </h2>
              <p className="leading-relaxed">
                This is the long-term filing cabinet. It is much slower than
                RAM, but it keeps your data safe even when the power is off.
                When you double-click a program, the computer copies the files
                from the slow Storage into the fast RAM so the CPU can run it.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center pb-20">
          <p className="text-slate-500">End of Theory Section</p>
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
