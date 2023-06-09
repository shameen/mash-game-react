import React, { useState } from "react";
import { MashCategory } from "../types/MashCategory";
import getRandomMashCategories from "../utils/getRandomMashCategories";
import DelayedLinePrinter from "./DelayedLinePrinter";
import { removeElementAtIndex } from "../utils/removeElementAtIndex";

interface MashGameProps {
  numGroups: number;
  numItemsPerGroup: number;
}

const MashGame: React.FC<MashGameProps> = ({ numGroups, numItemsPerGroup }) => {
  const initialStateGroups = (): MashCategory[] => {
    const groups: MashCategory[] = [];
    const exampleCategories = getRandomMashCategories(
      numGroups,
      numItemsPerGroup
    );
    for (let i = 0; i < numGroups; i++) {
      const header = exampleCategories[i].header;
      const items: string[] = [];
      for (let j = 0; j < numItemsPerGroup; j++) {
        items.push("");
      }
      groups.push({ header, items });
    }
    return groups;
  };

  const [groups, setGroups] = useState<MashCategory[]>(initialStateGroups());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /** The items that were removed/strikethrough-ed */
  const [resultDeleted, setResultDeleted] = useState<string[]>([]);
  /** A waiting area where the result is, until after the Deleted animation is done */
  const [resultPending, setResultPending] = useState<string>("");
  /** The result displayed on screen */
  const [resultFinal, setResultFinal] = useState<string>("");

  /** When typing into each MASH Section, update our state accordingly */
  const handleTextChange = (
    groupIndex: number,
    itemIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newGroups = [...groups];
    newGroups[groupIndex].items[itemIndex] = e.target.value;
    setGroups(newGroups);
  };

  const RandomizeEverything = () => {
    const categories = getRandomMashCategories(numGroups, numItemsPerGroup);
    setGroups(categories);
  };

  const PendingResultToFinalResult = () => {
    setResultFinal(resultPending);
    setResultPending("");
  };

  const DoTheMash = async () => {
    setResultPending("");
    setResultFinal("");
    setResultDeleted([]);
    setIsLoading(true);

    //Prepare group data as a single flat array ("MASH" isn't actually on-screen so it's added hard-coded here)
    const mashValues = [
      "You live in a Mansion",
      "You live in an Apartment",
      "You live in a Shack",
      "You live in a House",
    ];
    const allValues: Array<string> = [
      ...mashValues,
      ...groups.flatMap((g) => g.items.flatMap((gi) => `${g.header}: ${gi}`)),
    ];

    /** @returns true if resultValues has at least one value from each Group */
    function _resultHasAtLeastOneFromEachGroup(resultValues: string[]) {
      return (
        resultValues[0].indexOf("You live in a") === 0 &&
        groups.every((g) =>
          resultValues.find((v) => v.indexOf(`${g.header}:`) === 0)
        )
      );
    }

    /** A "Magic" number that is the number of steps of active values before being the next one to remove */
    const magicNumber = Math.floor(
      3 + ((Math.random() * 9973) % allValues.length)
    );

    //Main loop
    const targetValueCount = groups.length + 1;
    let values = allValues;
    const deleted = [];
    for (let i = 0; i < allValues.length ** 2; i += magicNumber) {
      //The remaining values are in "values", so adding magic number is the first candidate for removal
      if (values.length === targetValueCount) {
        //We're done
        break;
      }

      //If the current "candidate" is the only one left in its category, try the next one (keep trying until we find a good one)
      while (true) {
        const indexToDelete = i % values.length;
        const candidate = removeElementAtIndex(values, indexToDelete);
        if (_resultHasAtLeastOneFromEachGroup(candidate)) {
          deleted.push(values[indexToDelete]);
          values = candidate;
          break;
        } else {
          i++;
        }
        if (i > 10000) {
          //We shouldn't get here, but this is a just-in-case so we don't break the browser
          console.error("too many iterations");
          alert("Sorry, there was an unexpected error, Please try again");
          return;
        }
      }
    }

    const result = [`Your magic number is ${magicNumber}`, ...values];
    setResultDeleted(deleted);
    setResultPending(result.join("\n"));
    setTimeout(() => setIsLoading(false), 200);
  };

  return (
    <main>
      <header className="text-white text-center mb-10">
        <h1 className="text-4xl">MASH</h1>
      </header>

      <section id="mash-categories">
        {groups.map((group, groupIndex) => (
          <div
            className="w-full md:w-6/12 xl:w-3/12 p-2 inline-block"
            key={groupIndex}
          >
            <h2 className="text-white">{group.header}</h2>
            {group.items.map((text, itemIndex) => (
              <input
                key={itemIndex}
                type="text"
                value={text}
                onChange={(e) => handleTextChange(groupIndex, itemIndex, e)}
                className="w-full mb-2 p-1"
              />
            ))}
          </div>
        ))}
      </section>

      <section id="mash-action-bar" className="m-3 p-3 border-t">
        <button
          type="button"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow active:translate-y-px"
          title="Random Category"
          onClick={RandomizeEverything}
          autoFocus={true}
        >
          🎲 Randomize
        </button>

        <button
          type="button"
          className="cursor-pointer ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow active:translate-y-px"
          onClick={DoTheMash}
        >
          Go !
        </button>
      </section>

      {isLoading ? (
        <>loading...</>
      ) : resultPending ? (
        <section id="mash-results" className="m-3 p-3 border-t">
          <div className="line-through">
            <DelayedLinePrinter
              strings={resultDeleted}
              callback={PendingResultToFinalResult}
            />
          </div>
        </section>
      ) : resultFinal ? (
        <>
          <div className="line-through">
            <DelayedLinePrinter strings={resultDeleted} delay={0} />
          </div>
          <p className="whitespace-pre bg-white shadow-lg rounded-lg p-4 text-black">
            {resultFinal}
          </p>
          <div className="m-6">
            <button
              onClick={(_) => setResultFinal("")}
              className="cursor-pointer ml-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow active:translate-y-px"
            >
              Reset
            </button>
          </div>
        </>
      ) : null}
    </main>
  );
};

export default MashGame;
