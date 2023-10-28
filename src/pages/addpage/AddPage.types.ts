export interface IReservation {
  stay: {
    arrivalDate: string;
    departureDate: string;
  };
  firstName: string;
  room: {
    roomSize: string;
  };
  extras: string[];
  tags: string[];
  payment: string;
  reminder: boolean;
  newsletter: boolean;
  confirm: boolean;
}

export const initialReservation: IReservation = {
  stay: {
    arrivalDate: "",
    departureDate: "",
  },
  firstName: "",
  room: {
    roomSize: "Standard Room",
  },
  extras: [],
  tags: [],
  payment: "",
  reminder: false,
  newsletter: false,
  confirm: false,
};
