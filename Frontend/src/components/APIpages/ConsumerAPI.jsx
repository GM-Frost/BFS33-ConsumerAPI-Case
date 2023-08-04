import React, { useState, useEffect } from "react";
import Navbar from "../pages/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const ConsumerAPI = () => {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~ FOR CUSTOMER FORM ~~~~~~~~~~~~~~~~~~~~~~//

  const [consumerFormData, setConsumerFormData] = useState({
    customerFname: "",
    customerLname: "",
    customerEmail: "",
    customerAddress: "",
    customerPhone: "",
  });

  const [orderFormData, setOrderFormData] = useState({
    orderName: "",
    orderPrice: "",
    orderStatus: "",
    orderCustomerID: "",
  });

  const [message, setMessage] = useState("");
  const [orderMessage, setOrderMessage] = useState("");

  const resetConsumerForm = () => {
    setConsumerFormData({
      customerFname: "",
      customerLname: "",
      customerEmail: "",
      customerAddress: "",
      customerPhone: "",
    });
  };

  const resetOrderForm = () => {
    setOrderFormData({
      orderName: "",
      orderPrice: "",
      orderStatus: "",
      orderCustomerID: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsumerFormData({ ...consumerFormData, [name]: value });
  };
  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData({ ...orderFormData, [name]: value });
  };

  const handleCreateConsumer = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "customerFname",
      "customerLname",
      "customerEmail",
      "customerAddress",
      "customerPhone",
    ];

    const emptyFields = requiredFields.filter(
      (field) => !consumerFormData[field].trim()
    );

    if (emptyFields.length > 0) {
      setMessage(
        <span
          style={{ color: "white", backgroundColor: "red", padding: "4px" }}
        >
          Please input values in all the fields.
        </span>
      );
      return;
    }

    //________________________ SPRING BACKEND STARTS________________________
    /* **************************************************************** */
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~ CREATE CUSTOMER ~~~~~~~~~~~~~~~~~~~~~~//
    try {
      const createConsumer = await axios.post(
        "http://localhost:9004/api/consumer/customers",
        consumerFormData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // RETRIEVE RESPONSE FROM BACKEND

      if (createConsumer.status === 200) {
        setMessage(
          <span
            style={{ color: "white", backgroundColor: "green", padding: "4px" }}
          >
            Consumer Customer Created!
          </span>
        );
        resetConsumerForm();
      }
    } catch (error) {
      setMessage(
        <span style={{ color: "red" }}>
          Failed to Create Consumer. Please try again later.
        </span>
      );
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();

    const requiredOrderFields = [
      "orderName",
      "orderPrice",
      "orderStatus",
      "orderCustomerID",
    ];

    const orderEmptyFields = requiredOrderFields.filter(
      (field) => !orderFormData[field].trim()
    );

    if (orderEmptyFields.length > 0) {
      setOrderMessage(
        <span
          style={{ color: "white", backgroundColor: "red", padding: "4px" }}
        >
          Please input values in all the fields.
        </span>
      );
      return;
    }
    //________________________ SPRING BACKEND STARTS________________________
    /* **************************************************************** */
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~ ORDER ~~~~~~~~~~~~~~~~~~~~~~//
    try {
      const createOrders = await axios.post(
        `http://localhost:9004/api/consumer/customers/${orderFormData.orderCustomerID}/orders`,
        orderFormData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // RETRIEVE RESPONSE FROM BACKEND

      if (createOrders.status === 200) {
        setOrderMessage(
          <span
            style={{ color: "white", backgroundColor: "green", padding: "4px" }}
          >
            Customer Order Created!
          </span>
        );
        resetOrderForm();
      }
    } catch (error) {
      setOrderMessage(
        <span style={{ color: "red" }}>
          Failed to Create Order. Please try again later.
        </span>
      );
    }
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~ CREATE ORDER ~~~~~~~~~~~~~~~~~~~~~~//

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
        <div className="w-full container container grid grid-cols-2 gap-5 container max-w-3xl m-auto flex flex-wrap flex-col md:flex-row items-center justify-start">
          <div className="flex flex-col lg:flex-row bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="py-12 px-12">
              <div className="text-center">{message && <p>{message}</p>}</div>
              <h2 className="text-3xl mb-4 text-[#422444]">
                Consumer Customer
              </h2>
              <form action="#" onSubmit={handleCreateConsumer}>
                <div className="mt-5">
                  <div className="grid grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="customerFname"
                      value={consumerFormData.customerFname}
                      onChange={handleInputChange}
                      className="border border-gray-400 py-1 px-2 rounded-md w-full"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="customerLname"
                      value={consumerFormData.customerLname}
                      onChange={handleInputChange}
                      className="border border-gray-400 py-1 px-2 rounded-md w-full"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <input
                    type="email"
                    placeholder="Email"
                    name="customerEmail"
                    value={consumerFormData.customerEmail}
                    onChange={handleInputChange}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Address"
                    name="customerAddress"
                    value={consumerFormData.customerAddress}
                    onChange={handleInputChange}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="customerPhone"
                    value={consumerFormData.customerPhone}
                    onChange={handleInputChange}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full transition ease-in-out delay-100 bg-[#1e293b] hover:bg-[#663053]  py-3 text-center text-white"
                  >
                    Create Customer
                  </button>
                </div>
                <div className="mt-5">
                  <Link to="/api/consumer/customers">
                    <button className="w-sm text-xs transition ease-in-out delay-100 bg-[#663053] p-1 rounded-lg text-center text-white">
                      View All Customer
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-full py-16 px-12">
              <div className="text-center">
                {orderMessage && <p>{orderMessage}</p>}
              </div>
              <h2 className="text-3xl mb-4 text-[#422444]">Order</h2>
              <form action="#" onSubmit={handleCreateOrder}>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Order Name"
                    name="orderName"
                    onChange={handleOrderChange}
                    value={orderFormData.orderName}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="number"
                    placeholder="Order Price"
                    name="orderPrice"
                    onChange={handleOrderChange}
                    value={orderFormData.orderPrice}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Order Status"
                    name="orderStatus"
                    onChange={handleOrderChange}
                    value={orderFormData.orderStatus}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Customer ID"
                    name="orderCustomerID"
                    onChange={handleOrderChange}
                    value={orderFormData.orderCustomerID}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full transition ease-in-out delay-100 bg-[#ba9195] hover:bg-[#663053]  py-3 text-center text-white"
                  >
                    Create Order
                  </button>
                </div>
                <div className="mt-5">
                  <Link to="/api/consumer/orders">
                    <button className="w-sm text-xs float-right transition ease-in-out delay-100 bg-[#48768b] p-1 rounded-lg text-center text-white">
                      View All Orders
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsumerAPI;
