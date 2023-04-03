import getRandomMashCategories from "../utils/getRandomMashCategories";

describe("getRandomMashCategories", () => {
  it("returns an empty array when n is 0", () => {
    const result = getRandomMashCategories(0, 0);
    expect(result).toEqual([]);
  });

  it("returns the correct number of categories", () => {
    const result = getRandomMashCategories(5, 0);
    expect(result.length).toEqual(5);
  });

  it("returns the correct number of inner items per category", () => {
    const result = getRandomMashCategories(3, 4);
    expect(result.length).toEqual(3);
    expect(result[0].items).toHaveLength(4);
    expect(result[1].items).toHaveLength(4);
    expect(result[2].items).toHaveLength(4);
  });
});
