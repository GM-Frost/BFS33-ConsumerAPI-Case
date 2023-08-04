import React, { useEffect, useState } from "react";
import Navbar from "../../pages/Navbar";
import { Link, useParams } from "react-router-dom";

const EnterpriseCustomerOrder = () => {
  const { customerID } = useParams();
  const [consumerOrder, setConsumerOrder] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9005/api/enterprise/customers/${customerID}/orders`)
      .then((response) => response.json())
      .then((data) => setConsumerOrder(data))
      .catch((error) => console.error("Error Fetching Customer Data: ", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full sm:w-2/3">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Link to="/api/enterprise/customers">
              <button
                type="button"
                className="absolute right-0 inline-block rounded border-2 border-neutral-800 px-6 pb-[1px] pt-1 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900"
                data-te-ripple-init
              >
                👈 Go Back
              </button>
            </Link>
            <div>
              <h1 className="text-xs text-white text-bold text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                Enterprise Customer
              </h1>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-l-lg">
                    Order name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Status
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-r-lg">
                    Order Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {consumerOrder.length === 0 ? (
                  <tr className="bg-white dark:bg-gray-800">
                    <td
                      colSpan="3"
                      className="text-white-300 text-center  px-6 py-4"
                    >
                      Sorry, No Orders to Display
                    </td>
                  </tr>
                ) : (
                  consumerOrder.map((order) => (
                    <tr className="bg-white dark:bg-gray-800" key={order}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {order.orderName}
                      </th>
                      <td className="px-6 py-4 text-yellow-500">
                        {order.orderStatus}
                      </td>
                      <td className="px-6 py-4 text-green-400">
                        $ {order.orderPrice}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterpriseCustomerOrder;
