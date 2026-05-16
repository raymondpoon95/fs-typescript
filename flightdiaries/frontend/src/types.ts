export type Weather = "rainy" | "sunny" | "windy" | "cloudy";

export type Visibility = "great" | "good" | "ok" | "poor";

export interface Diary {
  date: string;
  id: number;
  visibility: Visibility | undefined;
  weather: Weather | undefined;
  comment?: string;
}
