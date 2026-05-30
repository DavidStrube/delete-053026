import { test, expect } from "vitest";

function Sumsing(a: number, b: number) {
  return a + b;
}

test("Sumsing(5, 6) === 11", () => {
  expect(Sumsing(5, 6) === 11);
});
