import { userAgents } from "../../constants/userAgents";
import { randomUserAgent } from "../../utils";

describe('RandomUserAgent', () => {
  test('Should return an array random agent agent agent', () => {
    const userAgent = randomUserAgent();
    expect(userAgents).toContain(userAgent);
  });
});