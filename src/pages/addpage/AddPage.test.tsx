import { screen, render, fireEvent } from "@testing-library/react";
import AddPage from "./AddPage";
import { MemoryRouter } from "react-router-dom";
import { initialReservation } from "./AddPage.types";

describe("AddPage", () => {
  //Check if the "Add Reservation" Header is present
  test("should render the AddPage component", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );
    // Check if the "Add Reservation" header is present
    const addReservationHeader = screen.getByText("Add Reservation");
    expect(addReservationHeader).toBeInTheDocument();

    // Check if the form inputs and button are present
    const nameInput = screen.getByLabelText("Name");
    const arrivalDateInput = screen.getByLabelText("Arrival Date");
    const addButton = screen.getByRole("button", { name: "Submit" });

    expect(nameInput).toBeInTheDocument();
    expect(arrivalDateInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("should handle input change", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("First Name");
    const arrivalDateInput = screen.getByLabelText("Date of Arrival");

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(arrivalDateInput, { target: { value: "2023-10-30" } });

    expect(nameInput).toHaveValue("John");
    expect(arrivalDateInput).toHaveValue("2023-10-30");
  });
});
