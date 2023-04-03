import { render, screen } from "@testing-library/react";
import MashGame from "./MashGame";

test("renders MASH title", () => {
  render(<MashGame numGroups={4} numItemsPerGroup={4} />);
  const linkElement = screen.getByText(/MASH/i);
  expect(linkElement).toBeInTheDocument();
});
