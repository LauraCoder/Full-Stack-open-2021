interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height/100;
  const result = weight/heightInMeters/heightInMeters;
  if(result < 17){
    return 'Underweight';
  } else if (17 < result && result < 25){
    return 'Normal (healthy weight)';
  } else if (result > 25){
    return 'Overweight';
  }
  return 'undefined';
};

if(require.main === module){
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
  }
}

export default calculateBmi;