"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "../../../store/useStore";

const QUIZ_QUESTIONS = [
  {
    question: "What is the key difference between a Tree and a Graph?",
    options: [
      "Graphs use arrays, Trees use pointers",
      "Graphs can have loops (cycles), Trees cannot",
      "Trees have vertices, Graphs only have edges",
      "Trees are faster than Graphs",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "If you are mapping out a highway system between cities, what do the cities and highways represent?",
    options: [
      "Cities are Edges, Highways are Vertices",
      "Cities are Roots, Highways are Leaves",
      "Cities are Vertices, Highways are Edges",
      "Both are Vertices",
    ],
    correctAnswer: 2,
  },
  {
    question: "Which of these is a 'Directed' Graph relationship?",
    options: [
      "A Twitter/X follow (You follow someone, they don't have to follow back)",
      "A Facebook friendship (You both have to accept)",
      "A two-way street",
      "A multiplayer game server connection",
    ],
    correctAnswer: 0,
  },
];

export default function GraphsQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const completeModule = useStore((state) => state.completeModule);

  const checkAnswer = () => {
    if (selectedOption === null) return;
    if (selectedOption === QUIZ_QUESTIONS[currentQuestion].correctAnswer)
      setScore(score + 1);
    setIsAnswerChecked(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsQuizFinished(true);
      if (score >= 2) completeModule("graphs", 50);
    }
  };

  if (isQuizFinished) {
    const passed = score >= 2;
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 p-6 animate-fade-in">
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl max-w-md w-full text-center shadow-2xl animate-slide-up">
          <h2 className="text-3xl font-bold text-white mb-4">Exam Complete!</h2>
          <p className="text-6xl mb-6">{passed ? "🎉" : "❌"}</p>
          <p className="text-xl text-slate-300 mb-2">
            You scored:{" "}
            <span className="font-bold text-white">
              {score} / {QUIZ_QUESTIONS.length}
            </span>
          </p>
          {passed ? (
            <p className="text-green-400 font-bold mb-8">+50 XP Awarded!</p>
          ) : (
            <p className="text-red-400 font-bold mb-8">
              You need at least 2 correct to pass.
            </p>
          )}

          <div className="flex flex-col gap-3">
            {passed && (
              <Link
                href="/trees"
                className="block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition"
              >
                Next Module →
              </Link>
            )}
            <Link
              href="/sorting"
              className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition border border-slate-700"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[currentQuestion];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 p-6 animate-fade-in">
      <div className="max-w-2xl w-full animate-slide-up">
        <div className="mb-8 flex justify-between items-end">
          <p className="text-violet-500 font-bold tracking-widest uppercase text-sm">
            Tier 2 • Graphs Exam
          </p>
          <p className="text-slate-500 font-medium">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-white mb-8">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map((option, index) => {
              let btnClass =
                "w-full text-left p-4 rounded-lg border transition font-medium ";
              if (!isAnswerChecked)
                btnClass +=
                  selectedOption === index
                    ? "border-violet-500 bg-violet-500/10 text-white"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700";
              else if (index === q.correctAnswer)
                btnClass += "border-green-500 bg-green-500/20 text-green-400";
              else if (index === selectedOption)
                btnClass += "border-red-500 bg-red-500/20 text-red-400";
              else
                btnClass +=
                  "border-slate-800 bg-slate-900 text-slate-600 opacity-50";
              return (
                <button
                  key={index}
                  onClick={() => !isAnswerChecked && setSelectedOption(index)}
                  className={btnClass}
                  disabled={isAnswerChecked}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end">
          {!isAnswerChecked ? (
            <button
              onClick={checkAnswer}
              disabled={selectedOption === null}
              className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded font-bold disabled:bg-slate-800 transition"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-8 py-3 bg-white hover:bg-slate-200 text-slate-900 rounded font-bold transition"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
