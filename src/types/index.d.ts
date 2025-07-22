export type EachQuestionType = {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  marksAllocated: number;
  difficultyLevel: string;
};

type storeQuestionType = EachQuestionType & { id: string };

export type SavedAnswer = {
  id: string;
  givenAnswer: string | null;
  correctAnswer: string;
  timeTaken: number;
};

export type DifficultyLevelType = "Any" | "Easy" | "Medium" | "Hard" | "";

export type StoreType = {
  currentQuestionsArray: storeQuestionType[];
  difficultyLevel: DifficultyLevelType;
  savedAnswerArray: SavedAnswer[];
  setCurrentQuestionArray: (array: storeQuestionType[]) => void;
  setDifficultyLevel: (level: DifficultyLevelType) => void;
  updateSavedAnswerArray: (obj: SavedAnswer) => void;
  reset: () => void;
};
