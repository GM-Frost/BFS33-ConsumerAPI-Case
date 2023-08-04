import React, { useState, useEffect } from "react";
import Navbar from "../../pages/Navbar";
import { Link } from "react-router-dom";

const ConsumerCustomerTable = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9004/api/consumer/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error Fetching Customer Data: ", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full sm:w-2/3">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-xs text-white text-bold text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
              Consumer Customer
            </h1>
            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    First name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Orders</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {customer.customerFname}
                    </th>
                    <td className="px-6 py-4">{customer.customerLname}</td>
                    <td className="px-6 py-4">{customer.customerEmail}</td>
                    <td className="px-6 py-4">{customer.customerAddress}</td>
                    <td className="px-6 py-4">{customer.customerPhone}</td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`${customer.customerID}`}>
                        <button className="bg-transparent hover:bg-yellow-700 text-yellow-700 font-semibold hover:text-white py-1 px-3 border border-yellow-700 hover:border-transparent rounded">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`${customer.customerID}/orders`}>
                        <button className="bg-green-800 hover:bg-green-500 text-white font-bold py-1 px-3 rounded-full">
                          Orders
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

export default ConsumerCustomerTable;
