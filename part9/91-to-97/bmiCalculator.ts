const calculateBmi = (height: number, weight: number): string => {
  const bmiScore: number = weight / ((height / 100) ** 2);
  if (bmiScore < 16) return 'Underweight (Severe thinness)';
  if (bmiScore >= 16 && bmiScore < 17) return 'Underweight (Moderate thinness)';
  if (bmiScore >= 17 && bmiScore < 18.5) return 'Underweight (Mild thinness)';
  if (bmiScore >= 18.5 && bmiScore < 25) return 'Normal range';
  if (bmiScore >= 25 && bmiScore < 30) return 'Overweight (Pre-obese)';
  if (bmiScore >= 30 && bmiScore < 35) return 'Obese (Class I)';
  if (bmiScore >= 35 && bmiScore < 40) return 'Obese (Class II)';
  if (bmiScore >= 40) return 'Obese (Class III)';
}

console.log(calculateBmi(180, 74));