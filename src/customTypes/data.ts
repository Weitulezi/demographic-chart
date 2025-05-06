export interface ResponseJSON {
  data: Sensus[];
  source: Source[];
}

export interface Sensus {
  "ID Nation": string;
  Nation: string;
  "ID Year": number;
  Year: string;
  Population: number;
  "Slug Nation": string;
}

export interface Source {
  measures: string[];
  annotations: Annotations;
  name: string;
  substitutions: any[];
}

export interface Annotations {
  source_name: string;
  source_description: string;
  dataset_name: string;
  dataset_link: string;
  table_id: string;
  topic: string;
  subtopic: string;
}
