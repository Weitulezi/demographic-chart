"use client";
import { useEffect, useState } from "react";
import { ResponseJSON, Sensus, Annotations } from "../customTypes/data";
import { CustomLineChart } from "@/components/line-chart";
import { CustomPieChart } from "@/components/pie-chart";

export default function Home() {
  const [sensusList, setSensusList] = useState<Sensus[]>([]);
  const [sensusOrg, setSensusOrg] = useState<Annotations | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API and update the state with it
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://datausa.io/api/data?drilldowns=Nation&measures=Population`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json: ResponseJSON = await response.json();

        console.log(json);

        setSensusList(json.data);
        setSensusOrg(json.source[0].annotations);
        setError(null);
      } catch (e: any) {
        setError("Failed to fetch data");
        setSensusList([]);
        setSensusOrg(null);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <header className="w-full flex justify-start items-center m-auto">
        <div className="max-w-[1400px] w-full flex flex-col gap-6 justify-center items-center m-auto p-8">
          <h1 className="font-bold text-3xl">
            {sensusOrg !== null && sensusOrg.source_name}
          </h1>
          <p className="text-[18px]">
            {sensusOrg !== null && sensusOrg.source_description}
          </p>
          <div className="w-full flex justify-between">
            <div>
              <p>{sensusOrg && sensusOrg.dataset_name}</p>
            </div>
            <div>
              <p>{sensusOrg && sensusOrg.topic}</p>
            </div>
            <div>
              <p>{sensusOrg && sensusOrg.subtopic}</p>
            </div>
            <div>
              <p>{sensusOrg && sensusOrg.dataset_link}</p>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full flex justify-center">
        <div className="flex max-w-[1400px] w-full justify-between gap-12">
          <CustomLineChart />
          <CustomPieChart />
        </div>
      </main>
    </div>
  );
}
