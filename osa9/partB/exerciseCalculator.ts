interface ExerciseValues {
  target: number;
  dailyExerciseHours: number[];
}

const parseArguments = (args: Array<string>): ExerciseValues => {
  const dailyExerciseHours = args.slice(3).map(h => Number(h));
  console.log(dailyExerciseHours);
  if (dailyExerciseHours.length < 1) throw new Error('Not enough arguments');

  if (isNaN(Number(args[2])) || dailyExerciseHours.every(isNaN)) {
    throw new Error('Only numbers are allowed');
  }

  return {
    target: Number(args[2]),
    dailyExerciseHours
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (target: number, dailyExerciseHours: number[]): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(h => h > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  
  let rating;
  let ratingDescription;

  if ( average < target ){
    rating = 1;
    ratingDescription = 'You did not met the target hours. You will do better next time!';
  } else if ( average === target ){
    rating = 2;
    ratingDescription = 'Good job, you met the target hours!';
  } else {
    rating = 3;
    ratingDescription = 'Wow, you exceeded the target hours!';
  }

  return{
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if(require.main === module){
try {
  const { target, dailyExerciseHours } = parseArguments(process.argv);
  console.log(calculateExercises(target, dailyExerciseHours));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}
}

export default calculateExercises;