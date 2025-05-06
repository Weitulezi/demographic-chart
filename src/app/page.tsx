"use client";
import { useEffect, useState } from "react";
import { ResponseJSON, Sensus, Annotations } from "../customTypes/data";

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
    <div className="w-full h-screen">
      <header className="w-full flex justify-start items-center m-auto">
        <div className="h-16 max-w-[1400px] w-full flex flex-col gap-4 justify-center items-center m-auto p-16">
          <h1 className="font-bold text-3xl">
            {sensusOrg !== null && sensusOrg.source_name}
          </h1>
          <p className="text-[18px]">
            {sensusOrg !== null && sensusOrg.source_description}
          </p>
        </div>
      </header>
    </div>
  );
}
