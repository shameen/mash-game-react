import React from "react";
import "./DelayedLinePrinter.css";

type Props = {
  strings: string[];
  delay?: number;
  callback?: Function;
};

const DelayedLinePrinter: React.FC<Props> = ({
  strings,
  delay = 300,
  callback,
}) => {
  const delayMs = delay / 1000;
  if (typeof callback === "function") {
    const maxDelay = delay * (strings.length + 1);
    setTimeout(() => callback(), maxDelay);
  }
  return (
    <ul>
      {strings.map((s, i) => (
        <li
          key={i}
          className={delay ? "fadeIn" : ""}
          style={
            {
              animationDelay: delay
                ? `${(i * delayMs).toFixed(2)}s`
                : undefined,
            } as React.CSSProperties
          }
        >
          {s}
        </li>
      ))}
    </ul>
  );
};

export default DelayedLinePrinter;
