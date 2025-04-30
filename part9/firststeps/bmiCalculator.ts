function parseBmiArguments(args: string[]): { height: number, weight: number } {
    if (args.length < 2) throw new Error('Not enough arguments');
  
    const height = Number(args[0]);
    const weight = Number(args[1]);
  
    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Both height and weight should be valid numbers.');
    }
  
    if (height <= 0 || weight <= 0) {
      throw new Error('Height and weight must be positive numbers.');
    }
  
    return { height, weight };
  }
  
  function calculateBmi(heightCm: number, weightKg: number): string {
    const heightM = heightCm / 100; 
    const bmi = weightKg / (heightM * heightM);
  
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi < 24.9) {
      return 'Normal range';
    } else if (bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }
  
  try {
    const args = process.argv.slice(2);
    const { height, weight } = parseBmiArguments(args);
    console.log(calculateBmi(height, weight)); 
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong. Please check the input.';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    console.error(errorMessage);
  }
  