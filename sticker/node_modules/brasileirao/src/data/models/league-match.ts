export interface MatchData {
  match_date: string;
  match_time: string;
  teams: {
    home_team: {
      badge: string;
      name: string;
      abbreviation: string;
    },
    away_team: {
      badge: string;
      name: string;
      abbreviation: string;
    }
  },
  home_team_score: number | null;
  away_team_score: number | null;
  stadium: {
    name: string;
  },
}

export type RoundInformation = {
  current: number;
  last: number;
}

export type MatchDataResponse = {
  round_information: RoundInformation,
  matches: MatchData[];
};
