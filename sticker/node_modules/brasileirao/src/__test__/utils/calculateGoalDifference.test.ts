import {calculateGoalDifference} from '../../utils'

describe('calculateGoalDifference', () => {
  it('should return the difference between goals for and goals against', () => {
    const goalsFor = 10
    const goalsAgainst = 5
    const expected = 5
    const result = calculateGoalDifference(goalsFor, goalsAgainst)
    expect(result).toBe(expected)
  })
})