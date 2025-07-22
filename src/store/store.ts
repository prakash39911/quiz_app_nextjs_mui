import { StoreType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create<StoreType>()(
  persist(
    (set) => ({
      currentQuestionsArray: [],
      difficultyLevel: "",
      savedAnswerArray: [],

      setCurrentQuestionArray: (array) =>
        set(() => ({ currentQuestionsArray: array })),
      setDifficultyLevel: (level) => set(() => ({ difficultyLevel: level })),
      updateSavedAnswerArray: (obj) =>
        set((state) => {
          const existingIndex = state.savedAnswerArray.findIndex(
            (eachObj) => eachObj.id === obj.id
          );

          if (existingIndex !== -1) {
            const updatedArray = [...state.savedAnswerArray];
            updatedArray[existingIndex] = obj;
            return { savedAnswerArray: updatedArray };
          } else {
            return { savedAnswerArray: [...state.savedAnswerArray, obj] };
          }
        }),
      reset: () =>
        set(() => ({
          currentQuestionsArray: [],
          difficultyLevel: "",
          savedAnswerArray: [],
        })),
    }),
    {
      name: "quiz-store",
    }
  )
);
