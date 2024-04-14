"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";

export type Color = {
  textColor: string;
  backgroundColor: string;
};

const ColorPicker: React.FC<{
  children: React.ReactNode;
  overrideColors?: Color[];
  colorChanged?: (color: Color) => void;
}> = ({ children, overrideColors, colorChanged }) => {
  const [colors, setColors] = useState<Color[]>(
    overrideColors || [
      {
        textColor: "white",
        backgroundColor: "black",
      },
      {
        textColor: "white",
        backgroundColor: "#E11D48",
      },
      {
        textColor: "black",
        backgroundColor: "#F4F4F5",
      },
      {
        textColor: "white",
        backgroundColor: "#2563EB",
      },
      {
        textColor: "white",
        backgroundColor: "#F97316",
      },
      {
        textColor: "white",
        backgroundColor: "#884DEE",
      },
    ],
  );

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-fit px-2 py-1">
        <div className=" grid grid-cols-6 gap-2">
          {colors.map((color, i) => (
            <button
              onClick={() => colorChanged && colorChanged(color)}
              className="h-6 w-6 cursor-pointer rounded"
              style={{
                backgroundColor: color.backgroundColor,
              }}
              key={i}
            ></button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
