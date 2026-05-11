export const calculateBmi = (height: number, weight: number) => {
  const heightM = height / 100;
  const bmi = weight / heightM ** 2;

  const total = Number(bmi.toFixed(2));

  let range;

  switch (true) {
    case total < 16:
      range = "Underweight (Severe thinness)";
      break;
    case total > 16 && total < 17:
      range = "Underweight (Moderate thinness)";
      break;
    case total > 17 && total < 18.5:
      range = "Underweight (Mild thinness)";
      break;
    case total > 18.5 && total < 25:
      range = "Normal range";
      break;
    case total > 25 && total < 30:
      range = "Overweight (Pre-obese)";
      break;
    case total > 30 && total < 35:
      range = "Obese (Class I)";
      break;
    case total > 35 && total < 40:
      range = "Obese (Class II)";
      break;
    case total <= 40:
      range = "Obese (Class III)";
      break;
    default:
      if (isNaN(height) || isNaN(weight)) {
        throw new Error("Please check height or weight is a number");
      }
      throw new Error("Unable to calculate");
  }

  return range;
};
