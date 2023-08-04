import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../pages/Navbar";
import axios from "axios";

const ConsumerInfoForm = () => {
  const { customerID } = useParams();
  const [message, setMessage] = useState("");
  const [customer, setCustomer] = useState({
    customerFname: "",
    customerLname: "",
    customerEmail: "",
    customerAddress: "",
    customerPhone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "customerFname",
      "customerLname",
      "customerEmail",
      "customerAddress",
      "customerPhone",
    ];
    // const emptyFields = requiredFields.filter(
    //   (field) => !customer[field].trim()
    // );

    // if (emptyFields.length > 0) {
    //   setMessage(
    //     <span
    //       style={{ color: "white", backgroundColor: "red", padding: "4px" }}
    //     >
    //       Please input values in all the fields.
    //     </span>
    //   );
    //   return;
    // }

    //________________________ SPRING BACKEND STARTS________________________
    /* **************************************************************** */
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~ EDIT CUSTOMER ~~~~~~~~~~~~~~~~~~~~~~//

    try {
      const editConsumer = await axios.put(
        `http://localhost:9004/api/consumer/customers/${customerID}`,
        customer,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // RETRIEVE RESPONSE FROM BACKEND

      if (editConsumer.status === 200) {
        setMessage(
          <span
            style={{ color: "white", backgroundColor: "green", padding: "4px" }}
          >
            Consumer EDITED!
          </span>
        );
      }
    } catch (error) {
      setMessage(
        <span style={{ color: "red" }}>
          Failed to Edit Consumer. Please try again later.
        </span>
      );
    }
  };

  useEffect(() => {
    fetch(`http://localhost:9004/api/consumer/customers/${customerID}`)
      .then((response) => response.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.error("Error Fetching Customer Data: ", error));
  }, [customerID]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <>
      <Navbar />

      <div className="consumer flex justify-center items-center h-screen">
        <div className="w-full container container grid grid-cols-1 gap-5 container max-w-3xl m-auto flex flex-wrap flex-col md:flex-row items-center justify-start">
          <div className="flex flex-col lg:flex-row bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="py-12 px-12">
              <div className="text-center">{message && <p>{message}</p>}</div>
              <Link to="/api/consumer/customers">
                <button className="bg-transparent float-right hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Go Back
                </button>
              </Link>
              <h2 className="text-3xl mb-4 text-[#422444]">
                Consumer Customer
              </h2>
              <form action="#" onSubmit={handleSubmit}>
                <div className="mt-5">
                  <div className="grid grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="customerFname"
                      className="border border-gray-400 py-1 px-2 rounded-md w-full"
                      value={customer.customerFname}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="customerLname"
                      value={customer.customerLname}
                      onChange={handleChange}
                      className="border border-gray-400 py-1 px-2 rounded-md w-full"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <input
                    type="email"
                    placeholder="Email"
                    name="customerEmail"
                    value={customer.customerEmail}
                    onChange={handleChange}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Address"
                    name="customerAddress"
                    value={customer.customerAddress}
                    onChange={handleChange}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="customerPhone"
                    value={customer.customerPhone}
                    onChange={handleChange}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full transition ease-in-out delay-100 bg-[#1e293b] hover:bg-[#663053]  py-3 text-center text-white"
                  >
                    Edit Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ConsumerInfoForm;
