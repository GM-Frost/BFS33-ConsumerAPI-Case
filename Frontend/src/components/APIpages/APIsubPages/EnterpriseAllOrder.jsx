import React, { useState, useEffect } from "react";
import Navbar from "../../pages/Navbar";
import { Link } from "react-router-dom";

const EnterpriseAllOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9005/api/enterprise/customers/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) =>
        console.error("Error Fetching Customer Order Data: ", error)
      );
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full sm:w-2/3">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-xs text-white text-bold text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
              Enterprise Customer
            </h1>
            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Customer ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.orderID}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.orderName}
                    </th>
                    <td className="px-6 py-4">$ {order.orderPrice}</td>
                    <td className="px-6 py-4">{order.orderStatus}</td>
                    <td className="px-6 py-4">{order.customerID}</td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`${order.orderID}`}>
                        <button className="bg-transparent hover:bg-yellow-700 text-yellow-700 font-semibold hover:text-white py-1 px-3 border border-yellow-700 hover:border-transparent rounded">
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterpriseAllOrder;
