import { EachQuestionType } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const getRandomQuestions = (
  questions: EachQuestionType[],
  difficulty: string
) => {
  let filteredQuestions;

  if (difficulty === "Any") {
    filteredQuestions = [...questions];
  } else {
    filteredQuestions = questions.filter(
      (eachObj) =>
        eachObj.difficultyLevel.toLowerCase() === difficulty.toLowerCase()
    );
  }

  const shuffled = filteredQuestions.sort(() => Math.random() - 0.5);

  const shuffledArray = shuffled.slice(0, 4);

  return shuffledArray.map((eachObj) => {
    return {
      id: uuidv4(),
      ...eachObj,
    };
  });
};

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "success";
    case "medium":
      return "warning";
    case "hard":
      return "error";
    default:
      return "default";
  }
};
