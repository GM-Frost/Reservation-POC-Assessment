import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IReservation, initialReservation } from "./AddPage.types";
import axios from "axios";
const AddPage = (props: IReservation) => {
  const [formData, setFormData] = useState<IReservation>(initialReservation);

  //Handle Input Change

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("stay.")) {
      setFormData({
        ...formData,
        stay: {
          ...formData.stay,
          [name.substring("stay.".length)]: value,
        },
      });
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/reservations", {
        ...formData,
      });
      console.log("Reservation created:", response.data);
      setFormData(initialReservation);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center  min-h-screen">
          <div className="bg-white p-8 rounded-md shadow-lg w-[80%]">
            <Link
              to={"/"}
              className="flex cursor-pointer hover:text-red-400 justify-start items-center text-center gap-2"
            >
              <AiOutlineArrowLeft className="bg-gray-100 rounded-full" />
              <span>Go Back</span>
            </Link>
            <h2 className="flex flex-wrap justify-center text-2xl font-bold mb-4">
              Add Reservation
            </h2>
            <hr />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                aria-label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                maxLength={25}
                className="border border-gray-400 rounded-md p-2"
              />

              <label htmlFor="arrivalDate">Arrival Date</label>
              <input
                type="date"
                id="arrivalDate"
                className="border border-gray-400 rounded-md p-2"
                aria-label="Date of Arrival"
                name="stay.arrivalDate"
                value={formData.stay.arrivalDate}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPage;
