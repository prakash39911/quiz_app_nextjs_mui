"use client";

import QuizResult from "@/components/QuizResult";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";

export default function QuizResultPage() {
  const reset = useStore((state) => state.reset);
  const savedAnswerArray = useStore((state) => state.savedAnswerArray);
  const currentQuestionArray = useStore((state) => state.currentQuestionsArray);

  const router = useRouter();

  return (
    <QuizResult
      currentQuestionsArray={currentQuestionArray}
      savedAnswerArray={savedAnswerArray}
      onReset={() => {
        router.push(`/selectdifficulty`);
        reset();
      }}
    />
  );
}
