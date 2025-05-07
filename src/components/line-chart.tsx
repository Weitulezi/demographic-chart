"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Sensus } from "@/customTypes/data";

const chartConfig = {
  population: {
    label: "Population",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function CustomLineChart({ sensusList }: { sensusList: Sensus[] }) {
  return (
    <Card className="w-[50%] ">
      <CardHeader>
        <CardTitle>Population by Year</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={sensusList}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="ID Year"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis domain={[0, 500000000]} />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="Population"
              type="linear"
              stroke="var(--color-population)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
