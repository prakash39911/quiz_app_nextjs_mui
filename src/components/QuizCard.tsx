"use client";

import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Chip, Grow } from "@mui/material";
import QuestionAnswers from "./QuestionAnswers";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { getDifficultyColor } from "@/lib/UtilityFunctions";
import QuestionTimer from "./QuestionTimer";

export default function QuizCard({
  questionNumber,
  difficulty,
}: {
  questionNumber: number;
  difficulty: string;
}) {
  const router = useRouter();
  const currentQuestionsArray = useStore(
    (state) => state.currentQuestionsArray
  );
  const savedAnswerArray = useStore((state) => state.savedAnswerArray);
  const updateSavedAnswerArray = useStore(
    (state) => state.updateSavedAnswerArray
  );
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  const currentQuestionData =
    questionNumber > 0 && questionNumber <= currentQuestionsArray.length
      ? currentQuestionsArray[questionNumber - 1]
      : null;

  const timeTakenRef = useRef(timeTaken);
  const selectedValueRef = useRef(selectedValue);

  useEffect(() => {
    timeTakenRef.current = timeTaken;
    selectedValueRef.current = selectedValue;
  });

  useEffect(() => {
    if (!currentQuestionData) return;

    const savedData = savedAnswerArray.find(
      (q) => q.id === currentQuestionData.id
    );

    setTimeTaken(savedData?.timeTaken || 0);
    setSelectedValue(savedData?.givenAnswer || null);

    const timerId = setInterval(() => {
      setTimeTaken((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [questionNumber, currentQuestionData, savedAnswerArray]);

  if (!currentQuestionData) {
    return null;
  }

  const GetSelectedValue = (selectedOption: string) => {
    console.log("selected value---", selectedOption);

    setSelectedValue(selectedOption);
  };

  return (
    <Grow in={true}>
      <Card
        variant="outlined"
        className="p-6 shadow-2xl rounded-lg w-[800px] min-h-[500px] flex flex-col justify-between"
      >
        <div className="relative">
          <div className="text-3xl font-bold mb-2">
            <span className="text-4xl text-blue-400">M</span>ath Quiz
          </div>
          <div className="absolute right-24 top-1">
            <QuestionTimer timeTaken={timeTaken} />
          </div>
          <div className="absolute right-0 top-1">
            <Chip
              label={currentQuestionData.difficultyLevel}
              color={
                getDifficultyColor(currentQuestionData.difficultyLevel) as
                  | "default"
                  | "success"
                  | "warning"
                  | "error"
              }
              variant="outlined"
              size="medium"
            />
          </div>
          <div className="border-b border-gray-300 mt-6"></div>
          <CardContent className="p-0 mt-4 h-[450px]">
            <QuestionAnswers
              currentQuestionData={currentQuestionData}
              GetSelectedValue={GetSelectedValue}
              isSelectedValueAlreadyExist={selectedValue}
            />
          </CardContent>
        </div>
        <div>
          <div className="border-b border-gray-300"></div>
          <div className="flex gap-2 mt-4 justify-end">
            {questionNumber > 1 && (
              <Button
                variant="outlined"
                onClick={() =>
                  router.replace(`/quiz/${difficulty}/${questionNumber - 1}`)
                }
              >
                Previous
              </Button>
            )}
            {questionNumber < currentQuestionsArray.length && (
              <Button
                variant="outlined"
                onClick={() => {
                  updateSavedAnswerArray({
                    id: currentQuestionData.id,
                    givenAnswer: selectedValue,
                    correctAnswer: currentQuestionData.correctOption,
                    timeTaken: timeTaken,
                  });
                  router.replace(`/quiz/${difficulty}/${questionNumber + 1}`);
                }}
              >
                Next
              </Button>
            )}
            {questionNumber === currentQuestionsArray.length && (
              <Button
                variant="outlined"
                onClick={() => {
                  updateSavedAnswerArray({
                    id: currentQuestionData.id,
                    givenAnswer: selectedValue,
                    correctAnswer: currentQuestionData.correctOption,
                    timeTaken: timeTaken,
                  });
                  router.replace(`/quizresult`);
                }}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Grow>
  );
}
