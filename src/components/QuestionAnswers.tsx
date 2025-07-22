"use client";

import React, { useState, useEffect, useRef } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { storeQuestionType } from "@/types";
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/dist/contrib/auto-render";

const KatexRender = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.textContent = text;
      renderMathInElement(containerRef.current, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
        throwOnError: false,
      });
    }
  }, [text]);

  return <span ref={containerRef} />;
};

export default function QuestionAnswers({
  currentQuestionData,
  GetSelectedValue,
  isSelectedValueAlreadyExist,
}: {
  currentQuestionData: storeQuestionType | null;
  GetSelectedValue: (option: string) => void;
  isSelectedValueAlreadyExist: string | null;
}) {
  const [value, setValue] = useState(isSelectedValueAlreadyExist || "");

  useEffect(() => {
    setValue(isSelectedValueAlreadyExist || "");
  }, [isSelectedValueAlreadyExist]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = (event.target as HTMLInputElement).value;
    GetSelectedValue(selectedOption);
    setValue(selectedOption);
  };

  if (!currentQuestionData) {
    return <div>Loading Question...</div>;
  }

  return (
    <FormControl className="w-full">
      <div className="mb-4 text-center text-2xl font-semibold min-h-[6rem] flex items-center justify-center">
        <KatexRender text={currentQuestionData.question} />
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
            value="1"
            control={<Radio />}
            label={<KatexRender text={currentQuestionData.option1} />}
            className="w-full"
          />
        </div>
        <div className="border border-gray-300 rounded-md px-3 py-1 my-2 w-full hover:bg-gray-50">
          <FormControlLabel
            value="2"
            control={<Radio />}
            label={<KatexRender text={currentQuestionData.option2} />}
            className="w-full"
          />
        </div>
        <div className="border border-gray-300 rounded-md px-3 py-1 my-2 w-full hover:bg-gray-50">
          <FormControlLabel
            value="3"
            control={<Radio />}
            label={<KatexRender text={currentQuestionData.option3} />}
            className="w-full"
          />
        </div>
        <div className="border border-gray-300 rounded-md px-3 py-1 my-2 w-full hover:bg-gray-50">
          <FormControlLabel
            value="4"
            control={<Radio />}
            label={<KatexRender text={currentQuestionData.option4} />}
            className="w-full"
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
}
