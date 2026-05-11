export interface ExerciseResponse {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  numberOfDays: number[],
  dailyTargetAmount: number,
): ExerciseResponse => {
  const periodLength = numberOfDays.length;

  const trainingDays = numberOfDays.filter((days) => days).length;

  const success =
    trainingDays < periodLength ||
    numberOfDays.some((x) => x < dailyTargetAmount);

  const rating = trainingDays > periodLength / 2 ? 3 : 2;

  const ratingDescription = "not too bad but could be better";

  const average =
    numberOfDays.reduce((acc, currentValue) => {
      return acc + currentValue;
    }, 0) / numberOfDays.length;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: dailyTargetAmount,
    average,
  };
};
