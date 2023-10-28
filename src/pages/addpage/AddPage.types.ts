export interface IReservation {
  stay: {
    arrivalDate: string;
    departureDate: string;
  };
  firstName: string;
}

export const initialReservation: IReservation = {
  stay: {
    arrivalDate: "",
    departureDate: "",
  },
  firstName: "",
};
