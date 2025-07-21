"use client";

import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import OptionSelector from "./OptionSelector";
import { Button } from "@mui/material";
import DifficultySelector from "./DifficultySelector";

export default function QuizCard() {
  const [showDifficultySelector, setShowDifficultySelector] = useState(true);

  return (
    <Card variant="outlined" className="p-5 shadow-xl max-w-4xl">
      {showDifficultySelector ? (
        <DifficultySelector />
      ) : (
        <div>
          <div className="text-3xl font-bold mb-2">
            <span className="text-4xl text-blue-400">M</span>ath Quiz
          </div>
          <div className="border border-b-0 text-blue-300"></div>
          <CardContent>
            <OptionSelector />
          </CardContent>
          <div className="border border-b-0 text-blue-300"></div>
          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="outlined">Previous</Button>
            <Button variant="outlined">Next</Button>
            <Button variant="outlined">Submit</Button>
          </div>
        </div>
      )}
    </Card>
  );
}
