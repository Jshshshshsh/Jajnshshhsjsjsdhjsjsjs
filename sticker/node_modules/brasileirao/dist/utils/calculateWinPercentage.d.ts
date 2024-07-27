interface WinPercentageOptions {
    pointsPerWin?: number;
    accuracy?: boolean;
}
export declare const calculateWinPercentage: (points: number, played: number, options?: WinPercentageOptions) => number | string;
export {};
