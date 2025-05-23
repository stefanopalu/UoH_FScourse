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

    if (!height || !weight || isNaN(height) || isNaN(weight)) {
        res.status(400).json({ error: 'Malformatted parameters' });
    }

    const bmi = calculateBmi(height, weight);

    res.json({
        weight: weight,
        height: height,
        bmi: bmi,
    });
});

app.post('/exercises', (req, res) => {
     console.log(req.body);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { daily_exercises, target } = req.body;

        if (!daily_exercises || !target) {
            res.status(400).json({ error: 'parameters missing' });
            return
        }

        if (!Array.isArray(daily_exercises) || isNaN(target)) {
            res.status(400).json({ error: 'malformatted parameters' });
            return
        }

        const result = calculateExercises(daily_exercises, Number(target));

        res.json(result);
    });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

