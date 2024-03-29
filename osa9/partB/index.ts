/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);

    if( !height || !weight ) {
        res.status(400).json({error: 'malformatted parameters'});
    }
    res.json({ 
        height, 
        weight, 
        bmi 
    });
});

app.post('/exercises', (req, res) => {
    const { target, daily_exercises } = req.body;
    const dailyExerciseHours = daily_exercises.map((hours: number) => Number(hours));
    const malformattedParameters = dailyExerciseHours.some((parameter: number) => isNaN(Number(parameter)));

    if( !target || !daily_exercises || daily_exercises.length < 1 ) {
      res.status(400).json({error: 'parameters missing'});
    } else if (isNaN(Number(target)) || malformattedParameters)  {
      res.status(400).json({error: 'malformatted parameters'});
    }

   const result = calculateExercises(target, daily_exercises);
   res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});