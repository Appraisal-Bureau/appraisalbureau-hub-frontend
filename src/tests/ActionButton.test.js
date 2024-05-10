import ActionButton from "../components/ActionButton";
import { render } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import React from "react";

describe("ActionButton Component", () => {
  it("should render the ActionButton component with text", () => {
    const { getByText } = render(<ActionButton text="Click me" />);

    const buttonText = getByText("Click me");
    expect(buttonText).toBeInTheDocument();
  });
});
