interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type Rating = 1 | 2 | 3;

interface exerciseInputs {
  target: number;
  exerciseHours: Array<number>
}

const parseInputs = (args: Array<string>): exerciseInputs => {
  if (args.length < 5) throw new Error('Not enough arguments, provide at least target and two exercise hour logs');

  const exerciseHours: Array<number> = process.argv.slice(3).map(arg => Number(arg));

  return {
    target: Number(process.argv[2]),
    exerciseHours
  };
};

const calculateExercises = (exerciseHours: Array<number>, targetHours: number): Result => {
  const average: number = exerciseHours.reduce((total, hours) => total + hours) / exerciseHours.length;
  const rating: Rating = average < (targetHours * 0.8)
    ? 1
    : average < (targetHours * 1.2)
      ? 2
      : 3;

  const ratingOptions: Array<string> = ['poor result', 'average result', 'amazing result'];
  
  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter(hours => hours !== 0).length,
    success: average >= targetHours ? true : false,
    rating,
    ratingDescription: ratingOptions[rating - 1],
    target: targetHours,
    average
  };
};

try {
  const { target, exerciseHours } = parseInputs(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (e) {
  console.log('Error has occurred: ', e);
}

export default calculateExercises;