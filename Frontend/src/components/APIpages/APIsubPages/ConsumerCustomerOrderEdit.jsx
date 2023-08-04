import React, { useEffect, useState } from "react";
import Navbar from "../../pages/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const ConsumerCustomerOrderEdit = () => {
  const [message, setMessage] = useState("");
  const { orderID } = useParams();
  const [customerID, setCustomerID] = useState("");
  const [orderItem, setOrderItem] = useState({
    orderName: "",
    orderPrice: "",
    orderStatus: "",
    orderCustomerID: "",
  });

  const handleOrderChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setOrderItem((prevOrderItem) => ({
      ...prevOrderItem,
      [name]: value,
    }));
  };

  const handleEditOrder = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "orderName",
      "orderPrice",
      "orderStatus",
      "orderCustomerID",
    ];

    //________________________ SPRING BACKEND STARTS________________________
    /* **************************************************************** */
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~ EDIT CUSTOMER ~~~~~~~~~~~~~~~~~~~~~~//

    try {
      const editOrderItem = await axios.put(
        `http://localhost:9004/api/consumer/customers/${customerID}/orders/${orderID}`,
        orderItem,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // RETRIEVE RESPONSE FROM BACKEND

      if (editOrderItem.status === 200) {
        setMessage(
          <span
            style={{ color: "white", backgroundColor: "green", padding: "4px" }}
          >
            Order EDITED!
          </span>
        );
      }
    } catch (error) {
      setMessage(
        <span style={{ color: "red" }}>
          Failed to Edit Order. Please try again later.
        </span>
      );
    }
  };

  useEffect(() => {
    fetch(`http://localhost:9004/api/consumer/orders/${orderID}`)
      .then((response) => response.json())
      .then((data) => {
        setOrderItem(data);
        setCustomerID(data.customerID);
      })
      .catch((error) => console.error("Error Fetching Order Data: ", error));
  }, [orderID]);

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
            <div className="w-full py-16 px-12">
              <div className="text-center">{message && <p>{message}</p>}</div>
              <h2 className="text-3xl mb-4 text-[#422444]">Order</h2>
              <form onSubmit={handleEditOrder}>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Order Name"
                    name="orderName"
                    required
                    onChange={handleOrderChange}
                    value={orderItem.orderName}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="number"
                    placeholder="Order Price"
                    name="orderPrice"
                    required
                    onChange={handleOrderChange}
                    value={orderItem.orderPrice}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Order Status"
                    name="orderStatus"
                    required
                    onChange={handleOrderChange}
                    value={orderItem.orderStatus}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Customer ID"
                    name="orderCustomerID"
                    required
                    onChange={handleOrderChange}
                    value={orderItem.customerID}
                    disabled
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full transition ease-in-out delay-100 bg-[#ba9195] hover:bg-[#663053]  py-3 text-center text-white"
                  >
                    Edit Order
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

export default ConsumerCustomerOrderEdit;
