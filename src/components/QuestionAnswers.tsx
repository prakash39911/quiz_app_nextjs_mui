"use client";

import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { storeQuestionType } from "@/types";

export default function QuestionAnswers({
  currentQuestionData,
  GetSelectedValue,
  isSelectedValueAlreadyExist,
}: {
  currentQuestionData: storeQuestionType | null;
  GetSelectedValue: (option: string) => void;
  isSelectedValueAlreadyExist: string | null;
}) {
  const isSelected = isSelectedValueAlreadyExist
    ? isSelectedValueAlreadyExist
    : "";

  const [value, setValue] = useState(isSelected);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    GetSelectedValue((event.target as HTMLInputElement).value);
    setValue((event.target as HTMLInputElement).value);
  };

  if (!currentQuestionData) {
    return;
  }

  return (
    <FormControl className="w-full">
      <div className="mb-4 text-center text-2xl font-semibold min-h-[6rem] flex items-center justify-center">
        <span>Question: {currentQuestionData.question}</span>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        className="w-full"
      >
        <div className="border border-gray-300 rounded-md px-3 py-1 my-2 w-full hover:bg-gray-50">
          <FormControlLabel
            value={1}
            control={<Radio />}
            label={currentQuestionData.option1}
            className="w-full"
          />
        </div>
        <div className="border border-gray-300 rounded-md px-3 py-1 my-2 w-full hover:bg-gray-50">
          <FormControlLabel
            value={2}
            control={<Radio />}
            label={currentQuestionData.option2}
            className="w-full"
          />
        </div>
        <div className="border border-gray-300 rounded-md px-3 py-1 my-2 w-full hover:bg-gray-50">
          <FormControlLabel
            value={3}
            control={<Radio />}
            label={currentQuestionData.option3}
            className="w-full"
          />
        </div>
        <div className="border border-gray-300 rounded-md px-3 py-1 my-4 w-full hover:bg-gray-50">
          <FormControlLabel
            value={4}
            control={<Radio />}
            label={currentQuestionData.option4}
            className="w-full"
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
}
