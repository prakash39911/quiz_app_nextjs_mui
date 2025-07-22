"use client";

import DifficultySelector from "@/components/DifficultySelector";
import { questions } from "@/lib/data";
import { getRandomQuestions } from "@/lib/UtilityFunctions";
import { useStore } from "@/store/store";
import { DifficultyLevelType } from "@/types";
import { Card } from "@mui/material";
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
  }, []);

  const handleDifficultyValue = (difficulty: DifficultyLevelType) => {
    const questionsArray = getRandomQuestions(questions, difficulty);
    setCurrentQuestionArray(questionsArray);
    setDifficultyLevel(difficulty);

    router.push(`/quiz/${difficulty}/1`);
  };

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <Card variant="outlined" className="p-5 shadow-xl max-w-4xl">
        <DifficultySelector GetDifficultyValue={handleDifficultyValue} />
      </Card>
    </div>
  );
}
