"use client";

import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function OptionSelector() {
  const [value, setValue] = React.useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <div className="mb-2 max-auto text-center text-2xl font-semibold">
        Question : Find the mode for the data set, which shows the heights( in
        inches ) of 10 students in a class: 60, 65, 63, 62, 65, 70, 62, 68, 60,
        65
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <div className="border border-gray-300 rounded-md px-2 py-0.5 my-2.5">
          <FormControlLabel value="1" control={<Radio />} label="Female" />
        </div>
        <div className="border border-gray-300 rounded-md px-2 py-0.5 mb-2.5">
          <FormControlLabel value="2" control={<Radio />} label="Female" />
        </div>
        <div className="border border-gray-300 rounded-md px-2 py-0.5 mb-2.5">
          <FormControlLabel value="3" control={<Radio />} label="Female" />
        </div>
        <div className="border border-gray-300 rounded-md px-2 py-0.5 mb-1">
          <FormControlLabel value="4" control={<Radio />} label="Female" />
        </div>
      </RadioGroup>
    </FormControl>
  );
}
