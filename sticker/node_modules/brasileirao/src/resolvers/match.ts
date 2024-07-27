import { TableService } from '../data/datasource/http'
import { LeagueTable } from '../data/models'
import { extractedDataRoundMatches } from '../services'

export const match = async (liga:LeagueTable) => {

  const result = await TableService('GE', liga)

  return extractedDataRoundMatches(result.data, result.provider)

}