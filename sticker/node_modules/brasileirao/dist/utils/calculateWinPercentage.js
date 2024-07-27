"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWinPercentage = void 0;
const calculateWinPercentage = (points, played, options) => {
    const { pointsPerWin = 3, accuracy = false } = options !== null && options !== void 0 ? options : {};
    const possiblePoints = played * pointsPerWin;
    const percentage = (points / possiblePoints) * 100;
    if (accuracy) {
        return percentage.toFixed(2);
    }
    return Math.floor(percentage);
};
exports.calculateWinPercentage = calculateWinPercentage;
