import getRandomInt from "../utils/getRandomInt";

describe("getRandomInt", () => {
  it("returns a random number between 1 and 10", () => {
    const result = getRandomInt(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  it("returns a random number between 100 and 200", () => {
    const result = getRandomInt(100, 200);
    expect(result).toBeGreaterThanOrEqual(100);
    expect(result).toBeLessThanOrEqual(200);
  });

  it("returns a random number between -100 and 100", () => {
    const result = getRandomInt(-100, 100);
    expect(result).toBeGreaterThanOrEqual(-100);
    expect(result).toBeLessThanOrEqual(100);
  });

  it("returns a random number when given the same arguments", () => {
    const result1 = getRandomInt(1, 10000);
    const result2 = getRandomInt(1, 10000);
    expect(result1).not.toEqual(result2);
  });
});
