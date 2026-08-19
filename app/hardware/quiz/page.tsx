"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "../../../store/useStore";

// The Quiz Data
const QUIZ_QUESTIONS = [
  {
    question:
      "Which component is considered the 'brain' of the computer, executing mathematical instructions?",
    options: ["RAM", "The CPU", "The Hard Drive", "The Power Supply"],
    correctAnswer: 1, // Index 1 ("The CPU")
  },
  {
    question: "What happens to the data in RAM when the computer loses power?",
    options: [
      "It is permanently saved",
      "It gets compressed",
      "It is completely wiped clean",
      "It moves to the SSD",
    ],
    correctAnswer: 2,
  },
  {
    question: "Why do we need Storage (like an SSD) if RAM is so much faster?",
    options: [
      "Because RAM is too heavy",
      "To keep data safe long-term when power is off",
      "To make the computer look cooler",
      "RAM cannot hold numbers",
    ],
    correctAnswer: 1,
  },
];

export default function HardwareQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Bring in our global XP store!
  const completeModule = useStore((state) => state.completeModule);

  const handleOptionClick = (index: number) => {
    if (isAnswerChecked) return; // Prevent changing answer after checking
    setSelectedOption(index);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;

    if (selectedOption === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setIsAnswerChecked(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      // Finish Quiz and Award XP (50 XP for finishing)
      setIsQuizFinished(true);
      if (score >= 2) {
        // Only award XP if they passed!
        completeModule("hardware", 50);
      }
    }
  };

  // --- UI: RESULTS SCREEN ---
  if (isQuizFinished) {
    const passed = score >= 2;
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 p-6">
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl max-w-md w-full text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
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

          <Link
            href="/"
            className="block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // --- UI: QUIZ SCREEN ---
  const q = QUIZ_QUESTIONS[currentQuestion];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Header */}
        <div className="mb-8 flex justify-between items-end">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-sm">
            Tier 0 • Quiz
          </p>
          <p className="text-slate-500 font-medium">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </p>
        </div>

        {/* The Question Box */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-white mb-8">{q.question}</h2>

          <div className="space-y-3">
            {q.options.map((option, index) => {
              // Determine button styling based on state
              let btnClass =
                "w-full text-left p-4 rounded-lg border transition font-medium ";

              if (!isAnswerChecked) {
                btnClass +=
                  selectedOption === index
                    ? "border-blue-500 bg-blue-500/10 text-white"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700";
              } else {
                if (index === q.correctAnswer) {
                  btnClass += "border-green-500 bg-green-500/20 text-green-400"; // Correct answer is always green
                } else if (index === selectedOption) {
                  btnClass += "border-red-500 bg-red-500/20 text-red-400"; // Wrong selected answer is red
                } else {
                  btnClass +=
                    "border-slate-800 bg-slate-900 text-slate-600 opacity-50"; // Others faded out
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={btnClass}
                  disabled={isAnswerChecked}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          {!isAnswerChecked ? (
            <button
              onClick={checkAnswer}
              disabled={selectedOption === null}
              className="px-8 py-3 bg-blue-600 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-blue-500 text-white rounded font-bold transition"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-8 py-3 bg-white hover:bg-slate-200 text-slate-900 rounded font-bold transition"
            >
              {currentQuestion < QUIZ_QUESTIONS.length - 1
                ? "Next Question →"
                : "Finish Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
