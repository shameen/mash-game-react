import exampleCategories from "../data/exampleCategories.json";
import { MashCategory } from "../types/MashCategory";
import getRandomNItems from "./getRandomNItems";

export default function getRandomMashCategories(
  numCategories: number,
  numItemsInGroup: number
): Array<MashCategory> {
  const categories = getRandomNItems(exampleCategories, numCategories);
  return categories.map((cat) => {
    return {
      ...cat,
      items: getRandomNItems(cat.items, numItemsInGroup),
    };
  });
}
