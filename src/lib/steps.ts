export function calculateHumanStepPercentile(steps: number): number {
  if (steps < 3000) return 10;
  if (steps < 5000) return 25;
  if (steps < 7000) return 50;
  if (steps < 10000) return 75;
  if (steps < 14000) return 90;
  if (steps < 17000) return 95;
  return 95;
}

export function calculateDogStepPercentile(steps: number): number {
  if (steps < 8000) return 10;
  if (steps < 12000) return 25;
  if (steps < 16000) return 50;
  if (steps < 20000) return 75;
  if (steps < 25000) return 90;
  if (steps < 30000) return 95;
  return 99;
}
