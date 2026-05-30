import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

// Arrange, Act, Assert

// ******************** Simple Button

function SimpleButton() {
  return <button>Click Me</button>;
}

test("SimpleButton renders", () => {
  // Arrange
  render(<SimpleButton />);

  // Assert
  const button = screen.getByRole("button", { name: "Click Me" });
  expect(button).toBeInTheDocument();
});

// ******************** RenderPropsButton

type RenderPropsButtonProps = {
  label: string;
};

function RenderPropsButton({ label }: RenderPropsButtonProps) {
  return <button>{label}</button>;
}

test("RenderPropsButton renders prop passed label text", () => {
  // Arrange
  const testLabel = "Hello";

  // Act
  render(<RenderPropsButton label={testLabel} />);

  // Assert
  expect(screen.getByRole("button", { name: testLabel })).toBeInTheDocument();
});

// ******************** Callback Button

type CallbackButtonProps = {
  handleClick: () => void;
};

function CallbackButton({ handleClick }: CallbackButtonProps) {
  return <button onClick={handleClick}>Click Me</button>;
}

test("CallbackButton onclick callback", async () => {
  // Arrange
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<CallbackButton handleClick={handleClick} />);
  const button = screen.getByRole("button", { name: "Click Me" });

  // Act
  await user.click(button);

  // Assert
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// ******************** TestIdButton

type TestIdButtonProps = {
  testId?: string;
};

function TestIdButton({ testId }: TestIdButtonProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <button data-testid={testId} onClick={handleClick}>
      {isActive ? "Deactivate" : "Activate"}
    </button>
  );
}

test("TestIdButton toggles between Activate and Deactivate when pressed", async () => {
  // Arrange
  const user = userEvent.setup();
  render(<TestIdButton testId="MyIdButton" />);
  const button = screen.getByTestId("MyIdButton");

  // Initial Assertion
  expect(button).toHaveTextContent("Activate");

  // First Press - Act + Assert
  await user.click(button);
  expect(button).toHaveTextContent("Deactivate");

  // Second Press - Act + Assert
  await user.click(button);
  expect(button).toHaveTextContent("Activate");
});
