"use client";

import { Cell, LabelList, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Sensus } from "@/customTypes/data";
import { useEffect, useState } from "react";

export function CustomPieChart({ sensusList }: { sensusList: Sensus[] }) {
  const [colors, setColors] = useState<string[]>([]);

  const generateColors = (length: number): string[] => {
    let availableColors = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
    ];
    let colorIndex = -1;
    let result = [];
    for (let i = 0; i < length; i++) {
      result.push(availableColors[colorIndex]);
      colorIndex += 1;
      if (colorIndex >= availableColors.length) {
        colorIndex = 0;
      }
    }
    return result;
  };

  useEffect(() => {
    setColors(generateColors(sensusList.length));
  }, [sensusList]);

  return (
    <Card className="w-[50%] flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Year - Population</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={sensusList} dataKey="Population">
              <LabelList
                dataKey="ID Year"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => value}
              />
              {sensusList.map((_, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    name={`Population`}
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
