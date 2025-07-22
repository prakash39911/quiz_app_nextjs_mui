"use client";

import React from "react";
import { PunchClock } from "@mui/icons-material";

interface QuestionTimerProps {
  timeTaken: number;
}

const QuestionTimer = ({ timeTaken }: QuestionTimerProps) => {
  return (
    <div className="mx-auto w-52">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <PunchClock className="w-3 h-3 text-blue-400" />
          <span className="text-sm font-medium text-gray-600">Time Taken</span>
        </div>
        <div className="text-3xl font-bold text-blue-400">{timeTaken}s</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-400 shadow-md"
          style={{ width: `100%` }}
        />
      </div>
    </div>
  );
};

export default QuestionTimer;
