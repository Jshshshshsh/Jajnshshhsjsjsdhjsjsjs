import { LeagueTable, LeagueTableResultRequest, ProvidersSupported } from '../../models'
import { BASE_URL } from '../../../constants'
import request  from '../../../services/request'

export async function TableService (provider:ProvidersSupported ,liga: LeagueTable): Promise<LeagueTableResultRequest> {
  try {
    const data = await request.get(BASE_URL.TABLE[provider][liga])

    return {
      data,
      provider
    }
  } catch (error) {
    throw error
  }
}
