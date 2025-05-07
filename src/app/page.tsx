"use client";
import { useEffect, useState } from "react";
import { ResponseJSON, Sensus, Annotations } from "../customTypes/data";
import { CustomLineChart } from "@/components/line-chart";
import { CustomPieChart } from "@/components/pie-chart";
import { YearSelect } from "@/components/year-select";

export default function Home() {
  const [sensusList, setSensusList] = useState<Sensus[]>([]);
  const [sensusOrg, setSensusOrg] = useState<Annotations | null>(null);
  const [years, setYears] = useState<number[]>([]);

  const [filteredSensusList, setFilteredSensusList] = useState<Sensus[]>([]);
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);

  // Fetch data from the API and update the state with it
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://datausa.io/api/data?drilldowns=Nation&measures=Population`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json: ResponseJSON = await response.json();

      const sensusListData = json.data.reverse();

      setSensusList(sensusListData);
      setSensusOrg(json.source[0].annotations);

      const end = json.data[json.data.length - 1]["ID Year"];
      const start = json.data[0]["ID Year"];

      setYears(sensusListData.map((data) => data["ID Year"]));
      setStartYear(start);
      setEndYear(end);

      setFilteredSensusList(
        sensusListData.filter(
          (item) => item["ID Year"] >= start && item["ID Year"] <= end
        )
      );
    };
    getData();
  }, []);

  useEffect(() => {
    if (startYear && endYear) {
      setFilteredSensusList(
        sensusList.filter(
          (item) => item["ID Year"] >= startYear && item["ID Year"] <= endYear
        )
      );
    }
  }, [startYear, endYear]);

  return (
    <div className="w-full min-h-screen">
      <header className="w-full flex justify-start items-center m-auto">
        <div className="max-w-[1400px] w-full flex flex-col gap-6 justify-center items-center m-auto p-8">
          <h1 className="font-bold text-3xl">
            {sensusOrg !== null && sensusOrg.source_name}
          </h1>
          <p className="text-[18px] text-center">
            {sensusOrg !== null && sensusOrg.source_description}
          </p>
          <div className="w-full flex justify-between">
            <div>
              <p>Dataset: {sensusOrg && sensusOrg.dataset_name}</p>
            </div>
            <div>
              <p>Topic: {sensusOrg && sensusOrg.topic}</p>
            </div>
            <div>
              <p>Sub-Topic: {sensusOrg && sensusOrg.subtopic}</p>
            </div>
            <div>
              <p>Source: {sensusOrg && sensusOrg.dataset_link}</p>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full flex justify-center flex-col items-center">
        <div className="flex justify-center items-center p-5 gap-4">
          <>
            <YearSelect
              key={"start year select"}
              title={"start year"}
              years={years}
              updateYear={setStartYear}
            />
            <YearSelect
              key={"end year select"}
              title={"end year"}
              years={years}
              updateYear={setEndYear}
            />
          </>
        </div>
        <div className="flex max-w-[1400px] w-full sm:w-[90%] justify-between gap-12">
          <CustomLineChart sensusList={filteredSensusList} />
          <CustomPieChart sensusList={filteredSensusList} />
        </div>
      </main>
    </div>
  );
}
