"use client";

import React from "react";
import { PunchClock } from "@mui/icons-material";

interface QuestionTimerProps {
  timeTaken: number;
}

const QuestionTimer = ({ timeTaken }: QuestionTimerProps) => {
  return (
    <div className="mx-auto w-20 md:w-44">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <PunchClock className="w-3 h-3 text-blue-400" />
          <span className="hidden md:block text-sm font-medium text-gray-600">
            Time Taken
          </span>
        </div>
        <div className="text-3xl font-bold text-blue-400">{timeTaken}s</div>
      </div>
    </div>
  );
};

export default QuestionTimer;
