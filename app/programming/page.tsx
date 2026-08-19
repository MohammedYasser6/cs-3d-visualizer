import Link from "next/link";

export default function ProgrammingTheoryPage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-slate-950 text-slate-300 p-10 md:p-20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-3">
            Tier 0 • Module 2
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Programming 101
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            The CPU only understands electrical signals (1s and 0s). Programming
            languages are the bridge that translates our human logic into those
            electrical pulses.
          </p>
        </header>

        <div className="space-y-8">
          {/* The Compiler Card */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">⚙️</span> The Compiler
              </h2>
              <p className="leading-relaxed">
                When you write code in Java, C++, or Rust, the CPU cannot read
                it. A <strong>Compiler</strong> is a special program that takes
                your readable text and converts it into raw binary (Machine
                Code) before the program runs. It is the ultimate translator.
              </p>
            </div>
            <div className="md:w-1/3 bg-slate-950 flex items-center justify-center p-6 border-l border-slate-800">
              <pre className="text-xs text-green-400 font-mono">
                {`Source Code:
print("Hello")

⬇️ Compiler ⬇️

Machine Code:
01001000 01101001`}
              </pre>
            </div>
          </section>

          {/* Variables Card */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-3xl">📦</span> Variables (Data Types)
            </h2>
            <p className="leading-relaxed mb-6">
              When we want the computer to remember something in RAM, we put it
              in a box called a Variable. But the computer needs to know exactly
              what <em>type</em> of box to build so it saves the right amount of
              memory space.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded border border-slate-800">
                <p className="text-blue-400 font-bold font-mono mb-1">
                  Integer (int)
                </p>
                <p className="text-sm">Whole numbers only.</p>
                <p className="text-slate-500 font-mono text-xs mt-2">
                  age = 21
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded border border-slate-800">
                <p className="text-green-400 font-bold font-mono mb-1">
                  String (str)
                </p>
                <p className="text-sm">Text and characters.</p>
                <p className="text-slate-500 font-mono text-xs mt-2">
                  name = "Alice"
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded border border-slate-800">
                <p className="text-purple-400 font-bold font-mono mb-1">
                  Boolean (bool)
                </p>
                <p className="text-sm">True or False logic.</p>
                <p className="text-slate-500 font-mono text-xs mt-2">
                  is_active = true
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center pb-20">
          <p className="text-slate-500">End of Theory Section</p>
          <Link
            href="/programming/quiz"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg shadow-blue-900/50"
          >
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
