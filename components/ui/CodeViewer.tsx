"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export type CodeSnippets = {
  "C++": string;
  Java: string;
  Kotlin: string;
  Python: string;
};

interface CodeViewerProps {
  snippets: CodeSnippets;
  explanation?: string;
}

const LANGUAGE_MAP: Record<string, string> = {
  "C++": "cpp",
  Java: "java",
  Kotlin: "kotlin",
  Python: "python",
};

export default function CodeViewer({ snippets, explanation }: CodeViewerProps) {
  const [activeLang, setActiveLang] = useState<keyof CodeSnippets>("Java");

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Explanation Context */}
      {explanation && (
        <div className="mb-4 bg-slate-900 border border-slate-700 p-3 rounded text-sm text-slate-300 leading-relaxed">
          {explanation}
        </div>
      )}

      {/* IDE Window */}
      <div className="flex-1 rounded-xl overflow-hidden border border-slate-700 bg-[#1e1e1e] flex flex-col shadow-2xl">
        {/* Language Tabs (IDE Header) */}
        <div className="flex bg-[#252526] border-b border-slate-700">
          {(Object.keys(snippets) as Array<keyof CodeSnippets>).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-4 py-2 text-xs font-mono transition-colors ${
                activeLang === lang
                  ? "bg-[#1e1e1e] text-blue-400 border-t-2 border-t-blue-500"
                  : "bg-transparent text-slate-500 hover:text-slate-300 border-t-2 border-t-transparent"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Code Editor Body */}
        <div className="flex-1 overflow-auto custom-scrollbar text-sm">
          <SyntaxHighlighter
            language={LANGUAGE_MAP[activeLang]}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1.5rem",
              background: "transparent",
            }}
            showLineNumbers
          >
            {snippets[activeLang]}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
