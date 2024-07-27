interface WinPercentageOptions {
  pointsPerWin?: number;
  accuracy?: boolean;
}

export const calculateWinPercentage = (
  points: number,
  played: number,
  options?: WinPercentageOptions
): number | string => {
  const { pointsPerWin = 3, accuracy = false } = options ?? {}

  const possiblePoints = played * pointsPerWin
  const percentage = (points / possiblePoints) * 100

  if (accuracy) {
    return percentage.toFixed(2)
  }

  return Math.floor(percentage)
}
