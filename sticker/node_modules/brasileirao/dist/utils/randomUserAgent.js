"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomUserAgent = void 0;
const userAgents_1 = require("../constants/userAgents");
const randomUserAgent = () => {
    const randomIndex = Math.floor(Math.random() * userAgents_1.userAgents.length);
    return userAgents_1.userAgents[randomIndex];
};
exports.randomUserAgent = randomUserAgent;
