export interface TableData {
    position: number;
    team: string;
    popularName: string;
    acronym: string;
    points: number;
    played: number;
    shield: string;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    winPercentage: number;
    recentResults?: ('W' | 'D' | 'L')[];
    positionChange?: number;
}
export type LeagueTable = 'a' | 'b' | 'c';
