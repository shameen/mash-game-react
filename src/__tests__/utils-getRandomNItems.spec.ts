import getRandomNItems from "../utils/getRandomNItems";

describe("getRandomNItems", () => {
  const array = ["apple", "banana", "cherry", "date", "elderberry", "fig"];

  it("returns an empty array when n is 0", () => {
    const result = getRandomNItems(array, 0);
    expect(result).toEqual([]);
  });

  it("returns the whole array when n is greater than or equal to the array length", () => {
    const result = getRandomNItems(array, 6);
    expect(result).toEqual(array);
    const result2 = getRandomNItems(array, 7);
    expect(result2).toEqual(array);
  });

  it("returns n random items from the array", () => {
    const result = getRandomNItems(array, 3);
    expect(result.length).toEqual(3);
    expect(array).toContain(result[0]);
    expect(array).toContain(result[1]);
    expect(array).toContain(result[2]);
    expect(result).not.toEqual(array);
  });

  it("does not modify the original array", () => {
    const result = getRandomNItems(array, 2);
    expect(array).toHaveLength(6);
    expect(array).toEqual(expect.arrayContaining(array));
  });
});
