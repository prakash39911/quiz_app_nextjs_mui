"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SelectDifficulty } from "@/lib/data";
import { DifficultyLevelType } from "@/types";
import { v4 as uuidv4 } from "uuid";

export default function DifficultySelector({
  GetDifficultyValue,
}: {
  GetDifficultyValue: (difficulty: DifficultyLevelType) => void;
}) {
  const [difficulty, setDifficulty] = useState<DifficultyLevelType>("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setDifficulty(newValue as DifficultyLevelType);
    setError(null);
  };

  const handleSubmit = () => {
    if (difficulty.length > 0) {
      GetDifficultyValue(difficulty);
    } else {
      setError("Please Select Difficulty level");
    }
  };

  return (
    <div className="flex flex-col gap-8 m-6 h-[225px] md:h-[200px]">
      <div className="text-3xl font-bold text-transparent bg-clip-text bg-blue-400">
        Select Difficulty Level
      </div>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select_difficulty">Select</InputLabel>
            <Select
              labelId="select_difficulty"
              id="select_difficulty"
              value={difficulty}
              label="Select"
              onChange={handleChange}
            >
              {SelectDifficulty.map((eachVal) => (
                <MenuItem key={uuidv4()} value={eachVal}>
                  {eachVal}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <Button variant="outlined" onClick={handleSubmit}>
        Start Quiz
      </Button>
      {error && (
        <div className="text-red-600 text-center mt-[-15px]">{error}</div>
      )}
    </div>
  );
}
