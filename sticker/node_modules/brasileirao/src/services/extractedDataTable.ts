import { ProvidersSupported, TabelaGE, TableData } from '../data/models'
import { calculateGoalDifference, calculateWinPercentage } from '../utils'
export const extractedDataTable = (data: any, provider: ProvidersSupported):TableData[]  => {
  if (provider === 'GE') {
    const regex = /const\s+classificacao\s+=\s+({.*?});/
    const match = regex.exec(data)

    if (!match) {
      throw new Error('Não foi possível encontrar a tabela EXDD')
    }

    const classificacaoJSON = match[1]
    const allData = JSON.parse(classificacaoJSON) as TabelaGE

    const { classificacao } = allData

    const table = classificacao.map((team) => {
      const lastFiveResults = team.ultimos_jogos.map((result) => {
        return result === 'v' ? 'W' : result === 'd' ? 'L' : 'D'
      })

      return {
        position: team.ordem,
        team: team.nome_popular,
        acronym: team.sigla,
        shield: team.escudo,
        popularName: team.nome_popular,
        points: team.pontos,
        played: team.jogos,
        wins: team.vitorias,
        draws: team.empates,
        losses: team.derrotas,
        goalsFor: team.gols_pro,
        goalsAgainst: team.gols_contra,
        goalDifference: team.saldo_gols,
        winPercentage: team.aproveitamento,
        recentResults: lastFiveResults,
        positionChange: team.variacao
      }
    })

    return table
  }

    const regexTableRow = /<tr\s+class="body__row">(.*?)<\/tr>/gs
    const regexImage = /<img.*?src="(.*?)".*?title="(.*?)"/
    const regexTableCellNumber = /<td[^>]*>(\d+)<\/td>/g
    const regexTableCellTeamAcronym = /<span[^>]*class="hide__l"[^>]*>([^<]*)<\/span>/

    const matchesTableRows = data.match(regexTableRow) ?? [];

    if (!matchesTableRows.length) {
      throw new Error('Não foi possível encontrar a tabela')
    }

    const table = matchesTableRows.map((match:string, index:number) => {
      const matchImage = String(match).match(regexImage) ?? [];

      if(!matchImage.length){
        throw new Error('Não foi possível encontrar a imagem')
      }

      const matchTableCellTeamAcronym = String(match).match(regexTableCellTeamAcronym) ?? []

      if (!matchTableCellTeamAcronym.length) {
        throw new Error('Não foi possível encontrar a sigla')
      }

      const matchTableCellNumbers = String(match).match(regexTableCellNumber)

      if (!matchTableCellNumbers) {
        throw new Error('Não foi possível encontrar os de pontuação')
      }

      const filterNumbersTable = matchTableCellNumbers.map(item => Number(item.replace(/<[^>]*>/g, '')))

     
      const extractImageAndName = matchImage.filter((item) => item.replace(/^(src=|title=)/g, '') !== "");

      if(extractImageAndName.length < 3){
        throw new Error('Não foi possível extrair a imagem e o nome')
      }

      const [ ,shieldUrl,teamName ] = extractImageAndName

      const goalDifference = calculateGoalDifference(filterNumbersTable[5], filterNumbersTable[6])

      const winPercentage = calculateWinPercentage(filterNumbersTable[0], filterNumbersTable[1])

      const tableRow = {
        position: index + 1,
        team: teamName,
        acronym: matchTableCellTeamAcronym[1],
        shield: shieldUrl,
        popularName: teamName,
        points: filterNumbersTable[0],
        played: filterNumbersTable[1],
        wins: filterNumbersTable[2],
        draws: filterNumbersTable[3],
        losses: filterNumbersTable[4],
        goalsFor: filterNumbersTable[5],
        goalsAgainst: filterNumbersTable[6],
        goalDifference,
        winPercentage,
        recentResults: null,
        positionChange: null
      }

      return tableRow
    })

    return table
  
}
