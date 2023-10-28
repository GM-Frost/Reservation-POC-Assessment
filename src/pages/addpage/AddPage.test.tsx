import { screen, render, fireEvent } from "@testing-library/react";
import AddPage from "./AddPage";
import { MemoryRouter } from "react-router-dom";
import { initialReservation } from "./AddPage.types";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");

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

  test("should handle input change", async () => {
    userEvent.setup();
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("First Name");
    const arrivalDateInput = screen.getByLabelText("Date of Arrival");

    fireEvent.change(nameInput, { target: { value: "John" } });

    fireEvent.change(arrivalDateInput, { target: { value: "2023-10-30" } });

    // Convert the expected value to match the component's format
    const formattedDate = "2023-10-30";

    expect(nameInput).toHaveValue("John");
    expect(arrivalDateInput).toHaveValue(formattedDate);
  });

  test("should handle form submission", async () => {
    userEvent.setup();
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("First Name");
    const arrivalDateInput = screen.getByLabelText("Date of Arrival");
    const selectInput = screen.getByLabelText("Room Size");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    // Setting values for the inputs
    userEvent.type(nameInput, "John");
    userEvent.type(arrivalDateInput, "2023-10-30");
    userEvent.selectOptions(selectInput, "Standard Room");

    // Mock the axios
    (axios.post as jest.Mock).mockResolvedValue({ data: "Some response data" });

    fireEvent.click(submitButton);

    expect(nameInput).toHaveValue("");
    expect(arrivalDateInput).toHaveValue("");
    expect(selectInput).toHaveValue("standard-room");
  });
  test("should handle tag input and add tags", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const tagInput = screen.getByTestId("tagsInput");

    expect(tagInput).toHaveValue("");

    // Simulate entering a new tag and pressing space
    fireEvent.change(tagInput, { target: { value: "newTag" } });
    fireEvent.keyUp(tagInput, { key: " " });

    // Check that the new tag is added
    const tags = screen.getAllByTestId((id) => id.startsWith("tag-"));
    expect(tags).toHaveLength(3); // Initial tags + 1 new tag

    const removeButtons = screen.getAllByTestId((id) =>
      id.startsWith("removeTag-")
    );
    fireEvent.click(removeButtons[0]);

    // Check that the first tag is removed
    const remainingTags = screen.getAllByTestId((id) => id.startsWith("tag-"));
    expect(remainingTags).toHaveLength(2); // Two tags remaining
  });

  test("should handle radio button selection", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const creditCardRadio = screen.getByTestId("creditCardRadio");

    fireEvent.click(creditCardRadio);

    expect(creditCardRadio).toBeChecked();

    const creditCardLabel = screen.getByText("Credit Card");
    expect(creditCardLabel).toBeInTheDocument();
  });

  test("should handle checkbox selection", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const reminderCheckbox = screen.getByTestId("reminderCheckbox");

    fireEvent.click(reminderCheckbox);

    expect(reminderCheckbox).toBeChecked();

    const reminderLabel = screen.getByText("Send me a reminder");
    expect(reminderLabel).toBeInTheDocument();
  });

  test("should handle confirm checkbox selection", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const confirmCheckbox = screen.getByTestId("confirmCheckbox");

    fireEvent.click(confirmCheckbox);

    // Check if the confirm checkbox is checked
    expect(confirmCheckbox).toBeChecked();

    const confirmLabel = screen.getByText(
      "I confirm the information given above"
    );
    expect(confirmLabel).toBeInTheDocument();
  });
});
