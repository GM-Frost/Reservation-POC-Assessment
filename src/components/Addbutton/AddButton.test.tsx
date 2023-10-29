import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddButton from "./AddButton";

describe("AddButton", () => {
  it("should render the AddButton component", () => {
    render(
      <MemoryRouter>
        <AddButton />
      </MemoryRouter>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
