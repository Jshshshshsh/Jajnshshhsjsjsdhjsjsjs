import { ProvidersSupported, TabelaGE, MatchDataResponse } from '../data/models'

export const extractedDataRoundMatches = (data: any, provider: ProvidersSupported): MatchDataResponse => {

  if (provider !== "GE") {
    throw new Error('No momento apenas o provider GE é suportado')
  }

  const regex = /const\s+classificacao\s+=\s+({.*?});/
  const match = regex.exec(data)

  if (!match) {
    throw new Error('Não foi possível encontrar dados das partidas')
  }

  const dataJSON = match[1]
  const allData = JSON.parse(dataJSON) as TabelaGE

  const { lista_jogos, rodada } = allData

  const round_information = {
    current: rodada.atual,
    last: rodada.ultima
  }

  const matches = lista_jogos.map((match) => {

    return {
      match_date: match.data_realizacao,
      match_time: match.hora_realizacao,
      teams: {
        home_team: {
          badge: match.equipes.mandante.escudo,
          name: match.equipes.mandante.nome_popular,
          abbreviation: match.equipes.mandante.sigla,
        },
        away_team: {
          badge: match.equipes.visitante.escudo,
          name: match.equipes.visitante.nome_popular,
          abbreviation: match.equipes.visitante.sigla,
        }
      },
      home_team_score: match.placar_penaltis_mandante,
      away_team_score: match.placar_oficial_visitante,
      stadium: {
        name: match.sede.nome_popular
      },
    }
  })

  return {
    round_information,
    matches
  }


}
