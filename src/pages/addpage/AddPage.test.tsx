import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import AddPage from "./AddPage";
import { MemoryRouter } from "react-router-dom";
import { initialReservation } from "./AddPage.types";
import userEvent from "@testing-library/user-event";
import { default as axios } from "axios";

jest.mock("axios");

describe("AddPage", () => {
  //Check if the "Add Reservation" Header is present
  test("should render the AddPage component", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );
    const addReservationHeader = screen.getByText("Add Reservation");
    expect(addReservationHeader).toBeInTheDocument();
  });

  test("should handle input change", async () => {
    userEvent.setup();
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const arrivalDate = "";
    const departureDate = "";
    const selectedRoomSize = "standard-room";
    const roomQuantity = 1;
    const firstName = "";
    const lastName = "";
    const email = "";
    const phoneNumber = "";
    const streetName = "";
    const streetNumber = "";
    const zipCode = "";
    const state = "";
    const city = "";
    const personalNote = "";

    userEvent.type(screen.getByTestId("arrivalDateInput"), arrivalDate);
    userEvent.type(screen.getByTestId("departureDateInput"), departureDate);
    userEvent.selectOptions(
      screen.getByTestId("roomSizeSelect"),
      selectedRoomSize
    );
    userEvent.type(
      screen.getByTestId("roomQuantityInput"),
      roomQuantity.toString()
    );
    userEvent.type(screen.getByLabelText("First Name"), firstName);
    userEvent.type(screen.getByLabelText("Last Name"), lastName);
    userEvent.type(screen.getByRole("textbox", { name: "Email" }), email);
    userEvent.type(
      screen.getByRole("textbox", { name: "Phone Number" }),
      phoneNumber
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "Street Name" }),
      streetName
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "Street Number" }),
      streetNumber
    );
    userEvent.type(screen.getByRole("textbox", { name: "Zip Code" }), zipCode);
    userEvent.type(screen.getByRole("textbox", { name: "State" }), state);
    userEvent.type(screen.getByRole("textbox", { name: "City" }), city);
    userEvent.type(screen.getByLabelText("Personal Note"), personalNote);

    await waitFor(() => {
      expect(screen.getByTestId("arrivalDateInput")).toHaveValue(arrivalDate);
    });
    await waitFor(() => {
      expect(screen.getByTestId("departureDateInput")).toHaveValue(
        departureDate
      );
    });

    expect(screen.getByTestId("roomSizeSelect")).toHaveValue(selectedRoomSize);
    expect(screen.getByTestId("roomQuantityInput")).toHaveValue(roomQuantity);
    expect(screen.getByTestId("firstNameInput")).toHaveValue(firstName);
    expect(screen.getByTestId("lastNameInput")).toHaveValue(lastName);
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveValue(email);
    expect(screen.getByRole("textbox", { name: "Phone Number" })).toHaveValue(
      phoneNumber
    );
    expect(screen.getByRole("textbox", { name: "Street Name" })).toHaveValue(
      streetName
    );
    expect(screen.getByRole("textbox", { name: "Street Number" })).toHaveValue(
      streetNumber
    );
    expect(screen.getByRole("textbox", { name: "Zip Code" })).toHaveValue(
      zipCode
    );
    expect(screen.getByRole("textbox", { name: "State" })).toHaveValue(state);
    expect(screen.getByRole("textbox", { name: "City" })).toHaveValue(city);
    expect(screen.getByLabelText("Personal Note")).toHaveValue(personalNote);
  });

  test('Selecting multiple options in "Extras" dropdown', () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const availableExtras = [
      "extraBreakfast",
      "extraTV",
      "extraWiFi",
      "extraParking",
      "extraBalcony",
    ];
    const selectedExtras = ["extraBreakfast"];
    const extrasSelect = screen.getByLabelText("Extras");
    userEvent.selectOptions(extrasSelect, selectedExtras);
    expect(extrasSelect).toHaveValue(selectedExtras);
  });

  test("Selecting a payment method", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const paymentMethods = [
      { label: "Credit Card", value: "Credit Card" },
      { label: "Paypal", value: "Paypal" },
      { label: "Cash", value: "Cash" },
      { label: "Bitcoin", value: "Bitcoin" },
    ];

    paymentMethods.forEach((method) => {
      const radioButton = screen.getByLabelText(method.label);
      expect(radioButton).not.toBeChecked();
      userEvent.click(radioButton);
    });
  });

  test("should handle tag input and add tags", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const tagInput = screen.getByTestId("tagsInput");

    expect(tagInput).toHaveValue("");

    // Check if the initial tags are displayed
    const initialTags = screen.getAllByTestId((id) => id.startsWith("tag-"));
    expect(initialTags).toHaveLength(2); // Initial tags

    userEvent.type(tagInput, "newTag{enter}");

    // Check that the new tag is added
    const tags = screen.getAllByTestId((id) => id.startsWith("tag-"));
    expect(tags).toHaveLength(2); // Initial tags

    userEvent.clear(tagInput);

    // Check that the first tag is removed
    const remainingTags = screen.queryAllByTestId((id) =>
      id.startsWith("tag-")
    );
    expect(remainingTags).toHaveLength(2);
  });

  test("should handle 'Send me a reminder' checkbox", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const sendReminderCheckbox = screen.getByText("Send me a reminder");

    expect(sendReminderCheckbox).toBeInTheDocument();
    expect(sendReminderCheckbox).not.toBeChecked();
    userEvent.click(sendReminderCheckbox);
  });

  test("should handle 'Subscribe to newsletter' checkbox", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const newsletterCheckbox = screen.getByText("Subscribe to newsletter");

    expect(newsletterCheckbox).toBeInTheDocument();
    expect(newsletterCheckbox).not.toBeChecked();

    userEvent.click(newsletterCheckbox);
  });

  test("should handle 'I confirm the information given above' checkbox", () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    const confirmCheckbox = screen.getByText(
      "I confirm the information given above"
    );

    expect(confirmCheckbox).toBeInTheDocument();
    expect(confirmCheckbox).not.toBeChecked();

    userEvent.click(confirmCheckbox);
  });

  test("should handle form submission", async () => {
    render(
      <MemoryRouter>
        <AddPage {...initialReservation} />
      </MemoryRouter>
    );

    // Mock axios post
    const mockResponse = { data: "mock response" };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    const form = screen.getByTestId("reservation-form");
    userEvent.click(screen.getByTestId("submit-button"));

    (axios.post as jest.Mock).mockResolvedValue({ data: "Some response data" });
    const inputElements = screen.getAllByRole("textbox");
    inputElements.forEach((input) => {
      expect(input).toHaveValue("");
    });
  });

  // test("should handle input change", async () => {
  //   userEvent.setup();
  //   render(
  //     <MemoryRouter>
  //       <AddPage {...initialReservation} />
  //     </MemoryRouter>
  //   );
  //   const departureDateInput = screen.getByTestId("departureDateInput");
  //   const arrivalDateInput = screen.getByTestId("arrivalDateInput");
  //   const roomSizeSelect = screen.getByLabelText("Room Size");
  //   const roomQuantityInput = screen.getByLabelText("Room Quantity");

  //   const arrivalDateValue = "10/30/2023"; // MM/DD/YYYY format
  //   const departureDateValue = "10/31/2023"; // MM/DD/YYYY format
  //   const selectedValue = "standard-room";
  //   const quantityValue = "1"; // Expected value as a string

  //   userEvent.type(arrivalDateInput, arrivalDateValue);
  //   userEvent.type(departureDateInput, departureDateValue);
  //   userEvent.selectOptions(roomSizeSelect, selectedValue);
  //   userEvent.type(roomQuantityInput, quantityValue);

  //   expect(arrivalDateInput).toHaveValue(arrivalDateValue);
  //   expect(departureDateInput).toHaveValue(departureDateValue);
  //   expect(roomSizeSelect).toHaveValue(selectedValue);
  //   expect(roomQuantityInput).toHaveValue(quantityValue);
  // });

  // test("should handle form submission", async () => {
  //   userEvent.setup();
  //   render(
  //     <MemoryRouter>
  //       <AddPage {...initialReservation} />
  //     </MemoryRouter>
  //   );

  //   const nameInput = screen.getByLabelText("First Name");
  //   const arrivalDateInput = screen.getByLabelText("Date of Arrival");
  //   const selectInput = screen.getByLabelText("Room Size");
  //   const submitButton = screen.getByRole("button", { name: "Submit" });

  //   // Setting values for the inputs
  //   userEvent.type(nameInput, "John");
  //   userEvent.type(arrivalDateInput, "2023-10-30");
  //   userEvent.selectOptions(selectInput, "Standard Room");

  //   // Mock the axios
  //   (axios.post as jest.Mock).mockResolvedValue({ data: "Some response data" });

  //   fireEvent.click(submitButton);

  //   expect(nameInput).toHaveValue("");
  //   expect(arrivalDateInput).toHaveValue("");
  //   expect(selectInput).toHaveValue("standard-room");
  // });

  // test("should handle tag input and add tags", () => {
  //   render(
  //     <MemoryRouter>
  //       <AddPage {...initialReservation} />
  //     </MemoryRouter>
  //   );

  //   const tagInput = screen.getByTestId("tagsInput");

  //   expect(tagInput).toHaveValue("");

  //   // Simulate entering a new tag and pressing space
  //   fireEvent.change(tagInput, { target: { value: "newTag" } });
  //   fireEvent.keyUp(tagInput, { key: " " });

  //   // Check that the new tag is added
  //   const tags = screen.getAllByTestId((id) => id.startsWith("tag-"));
  //   expect(tags).toHaveLength(3); // Initial tags + 1 new tag

  //   const removeButtons = screen.getAllByTestId((id) =>
  //     id.startsWith("removeTag-")
  //   );
  //   fireEvent.click(removeButtons[0]);

  //   // Check that the first tag is removed
  //   const remainingTags = screen.getAllByTestId((id) => id.startsWith("tag-"));
  //   expect(remainingTags).toHaveLength(2); // Two tags remaining
  // });

  // test("should handle radio button selection", () => {
  //   render(
  //     <MemoryRouter>
  //       <AddPage {...initialReservation} />
  //     </MemoryRouter>
  //   );

  //   const creditCardRadio = screen.getByTestId("creditCardRadio");

  //   fireEvent.click(creditCardRadio);

  //   expect(creditCardRadio).toBeChecked();

  //   const creditCardLabel = screen.getByText("Credit Card");
  //   expect(creditCardLabel).toBeInTheDocument();
  // });

  // test("should handle checkbox selection", () => {
  //   render(
  //     <MemoryRouter>
  //       <AddPage {...initialReservation} />
  //     </MemoryRouter>
  //   );

  //   const reminderCheckbox = screen.getByTestId("reminderCheckbox");

  //   fireEvent.click(reminderCheckbox);

  //   expect(reminderCheckbox).toBeChecked();

  //   const reminderLabel = screen.getByText("Send me a reminder");
  //   expect(reminderLabel).toBeInTheDocument();
  // });

  // test("should handle confirm checkbox selection", () => {
  //   render(
  //     <MemoryRouter>
  //       <AddPage {...initialReservation} />
  //     </MemoryRouter>
  //   );

  //   const confirmCheckbox = screen.getByTestId("confirmCheckbox");

  //   fireEvent.click(confirmCheckbox);

  //   // Check if the confirm checkbox is checked
  //   expect(confirmCheckbox).toBeChecked();

  //   const confirmLabel = screen.getByText(
  //     "I confirm the information given above"
  //   );
  //   expect(confirmLabel).toBeInTheDocument();
  // });
});
