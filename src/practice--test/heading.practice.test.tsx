import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Heading() {
  return <h1>Hello Dave</h1>;
}

test("Heading Displays", () => {
  render(<Heading />);
  const heading = screen.getByRole("heading", { name: "Hello Dave" });
  expect(heading).toBeInTheDocument();
});
