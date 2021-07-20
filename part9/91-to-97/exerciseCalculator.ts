interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type Rating = 1 | 2 | 3

const calculateExercises = (exerciseHours: Array<number>, targetHours: number): Result => {
  const average: number = exerciseHours.reduce((total, hours) => total + hours) / exerciseHours.length
  const rating: Rating = average < (targetHours * 0.8)
    ? 1
    : average < (targetHours * 1.2)
      ? 2
      : 3

  const ratingOptions: Array<string> = ['poor result', 'average result', 'amazing result']
  
  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter(hours => hours !== 0).length,
    success: average >= targetHours ? true : false,
    rating,
    ratingDescription: ratingOptions[rating - 1],
    target: targetHours,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))