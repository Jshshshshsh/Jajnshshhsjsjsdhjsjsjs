import { calculateWinPercentage } from '../../utils'

describe('calculateGoalDifference', () => {
  it('should return the percent winner', () => {
    const points = 9
    const played = 3
    const expected = 100
    const result = calculateWinPercentage(points, played)
    expect(result).toBe(expected)
  })

  it("Should return the value when the points option is different from the default", () => {
    const points = 10
    const played = 2
    const expected = 100
    const result = calculateWinPercentage(points, played, { pointsPerWin: 5 })
    expect(result).toBe(expected)
  })

  it("Should return the value in float format when the option is passed", () => {
    const points = 4
    const played = 2
    const expected = "66.67"
    const result = calculateWinPercentage(points, played, { accuracy: true })
    expect(result).toBe(expected)
  })
})