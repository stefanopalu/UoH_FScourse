interface Results {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }

  function parseArguments(args: string[]): { target: number, hours: number[] } {
    if (args.length < 2) throw new Error('Not enough arguments');
  
    const target = Number(args[0]);
    if (isNaN(target) || target <= 0) {
      throw new Error("Target should be a valid positive number.");
    }
  
    const hours = args.slice(1).map(Number);
    if (hours.some(hour => isNaN(hour))) {
      throw new Error("All daily exercise hours should be valid numbers.");
    }
  
    return { target, hours };
  }
  
  function calculateExercises(dailyExerciseH: number[], target: number): Results {
    const periodLength = dailyExerciseH.length;
    const trainingDays = dailyExerciseH.filter(e => e > 0).length;
    const totalH = dailyExerciseH.reduce((sum, current) => sum + current, 0);
    const average = totalH / periodLength;
    const success = average >= target;
  
    let rating: number;
    let ratingDescription: string;
  
    if (success) {
      rating = 3;
      ratingDescription = "Great job!";
    } else if (average >= target * 0.8) {
      rating = 2;
      ratingDescription = "Not too bad but could be better.";
    } else {
      rating = 1;
      ratingDescription = "Very bad.";
    }
  
    const results: Results = {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  
    return results;
  }
  if (require.main === module) {
  try {
    const { target, hours } = parseArguments(process.argv.slice(2));
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

export { calculateExercises };
