"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SelectDifficulty } from "@/lib/data";

export default function DifficultySelector() {
  const [difficulty, setDifficulty] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
  };

  return (
    <div className="flex flex-col gap-8 m-6">
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
              {SelectDifficulty.map((eachObj) => (
                <MenuItem key={eachObj.value} value={eachObj.value}>
                  {eachObj.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <Button variant="outlined">Start Quiz</Button>
    </div>
  );
}
