import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function YearSelect({
  title,
  years,
  updateYear,
}: {
  title: string;
  years: number[];
  updateYear: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const handleChange = (e: string) => {
    updateYear(Number(e));
  };
  return (
    <Select onValueChange={(e) => handleChange(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Select a ${title}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          {years.map((year, index) => (
            <SelectItem key={index} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
