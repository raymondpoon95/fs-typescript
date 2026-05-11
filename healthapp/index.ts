import express, { Response } from "express";
import { isNotNumber } from "./utils";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ExerciseResponse } from "./exerciseCalculator";

const app = express();
app.use(express.json());

type BmiResponse = {
  weight: number;
  height: number;
  bmi: string;
};

type ErrorResponse = {
  error: string;
};

type BmiApiResponse = BmiResponse | ErrorResponse;

type ExerciseApiResponse = ExerciseResponse | ErrorResponse;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

// bmi function
app.get("/bmi", (req, res: Response<BmiApiResponse>) => {
  const height = req.query?.height;
  const weight = req.query?.weight;

  if (!height || !weight) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }

  if (isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }

  if (require.main === module) {
    const bmi = calculateBmi(Number(height), Number(weight));

    res.send({
      weight: Number(weight),
      height: Number(height),
      bmi,
    });
  }
});

// exercise post
app.post("/exercises", (req, res: Response<ExerciseApiResponse>) => {
  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  const dailyExercises = req.body?.daily_exercises;
  const target = req.body?.target;

  // if (isNotNumber(target) || isNotNumber(dailyExercises)) {
  //   return res.status(400).json({
  //     error: "malformatted parameters",
  //   });
  // }

  if (
    isNotNumber(target) ||
    !Array.isArray(dailyExercises) ||
    dailyExercises.some((d: unknown) => typeof d !== "number")
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const response = calculateExercises(dailyExercises, target);

  return res.status(200).send({ ...response });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
