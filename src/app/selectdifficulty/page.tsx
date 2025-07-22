"use client";

import DifficultySelector from "@/components/DifficultySelector";
import { questions } from "@/lib/data";
import { getRandomQuestions } from "@/lib/UtilityFunctions";
import { useStore } from "@/store/store";
import { DifficultyLevelType } from "@/types";
import { GridOn, LockClockRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const setDifficultyLevel = useStore((state) => state.setDifficultyLevel);
  const setCurrentQuestionArray = useStore(
    (state) => state.setCurrentQuestionArray
  );
  const reset = useStore((state) => state.reset);
  const router = useRouter();

  useEffect(() => {
    reset();
  }, [reset]);

  const handleDifficultyValue = (difficulty: DifficultyLevelType) => {
    const questionsArray = getRandomQuestions(questions, difficulty);
    setCurrentQuestionArray(questionsArray);
    setDifficultyLevel(difficulty);

    router.push(`/quiz/${difficulty}/1`);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]"></div>

      <main className="z-10 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tight">
          Math Quiz Challenge
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-600">
          Test your skills with our timed math quiz. Choose a difficulty to
          begin!
        </p>

        <div className="mt-8 p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-md">
          <div className="flex justify-center items-center gap-4 text-gray-700 mb-6">
            <div className="flex items-center gap-2">
              <GridOn className="text-xl" />
              <span>4 Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <LockClockRounded className="text-xl" />
              <span>Timed</span>
            </div>
          </div>
          <DifficultySelector GetDifficultyValue={handleDifficultyValue} />
        </div>

        <footer className="mt-12 text-gray-500">
          <p>© {new Date().getFullYear()} Quiz Time. Built for fun.</p>
        </footer>
      </main>
    </div>
  );
}
