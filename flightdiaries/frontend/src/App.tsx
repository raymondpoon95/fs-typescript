import { useEffect, useState } from "react";

import diaryService from "./diaryService";
import type { Diary, Visibility, Weather } from "./types";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<Diary[]>([]);

  const [weather, setWeather] = useState<Weather>();
  const [visibility, setVisibility] = useState<Visibility>();
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getDiaryEntries = async () => {
      const response = await diaryService.getAllEntries();
      setDiaryEntries(response);
    };

    getDiaryEntries();
  }, []);

  if (!diaryEntries.length) {
    return <div>Loading data...</div>;
  }

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newDiaryEntry = {
      id: diaryEntries.length + 1,
      date,
      weather,
      visibility,
      comment,
    };

    try {
      const response = await diaryService.createNewDiaryEntry(newDiaryEntry);

      setVisibility(undefined);
      setWeather(undefined);
      setDate("");
      setComment("");

      console.log(response);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <>
      {diaryEntries.map((diary) => (
        <div key={diary.id} style={{ marginTop: "1rem" }}>
          <div>{diary.date}</div>
          <span>{diary.visibility} </span>
          <span>{diary.weather}</span>
          <div>{diary.comment}</div>
        </div>
      ))}

      <br />
      {errorMessage}
      <form onSubmit={handleSubmit}>
        <p>Please select your visibility:</p>
        <input type="radio" id="great" name="great" value="great" onChange={handleVisibilityChange} />
        <label htmlFor="great">great</label>

        <input type="radio" id="good" name="good" value="good" onChange={handleVisibilityChange} />
        <label htmlFor="good">good</label>

        <input type="radio" id="ok" name="ok" value="ok" onChange={handleVisibilityChange} />
        <label htmlFor="ok">ok</label>

        <input type="radio" id="poor" name="poor" value="poor" onChange={handleVisibilityChange} />
        <label htmlFor="poor">poor</label>

        <br />

        <p>Please select your weather:</p>
        <input type="radio" id="sunny" name="sunny" value="sunny" onChange={handleWeatherChange} />
        <label htmlFor="sunny">sunny</label>

        <input type="radio" id="rainy" name="rainy" value="rainy" onChange={handleWeatherChange} />
        <label htmlFor="rainy">rainy</label>

        <input type="radio" id="windy" name="windy" value="windy" onChange={handleWeatherChange} />
        <label htmlFor="windy">windy</label>

        <input type="radio" id="cloudy" name="cloudy" value="cloudy" onChange={handleWeatherChange} />
        <label htmlFor="cloudy">cloudy</label>

        <br />

        <label htmlFor="date">date</label>
        <input type="date" id="date" onChange={(e) => setDate(e.target.value)} />

        <label htmlFor="comment">comment</label>
        <input type="text" id="comment" onChange={(e) => setComment(e.target.value)} />

        <button>Submit</button>
      </form>
    </>
  );
};

export default App;
