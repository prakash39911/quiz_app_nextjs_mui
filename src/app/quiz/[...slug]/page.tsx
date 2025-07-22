"use client";

import QuizCard from "@/components/QuizCard";
import { useParams } from "next/navigation";

const Quiz = () => {
  const params = useParams();
  const slug = params.slug as string[];

  const difficulty = slug[0];
  const questionNumber = slug[1];

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <QuizCard
        questionNumber={parseInt(questionNumber)}
        difficulty={difficulty}
      />
    </div>
  );
};

export default Quiz;
