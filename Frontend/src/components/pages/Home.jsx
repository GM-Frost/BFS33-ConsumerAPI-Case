import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center h-screen">
        <div className="container grid grid-cols-2 gap-2 container max-w-xl m-auto flex flex-wrap flex-col md:flex-row items-center justify-start">
          <div>
            <Link
              to="/api/catalog"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Catalog API
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                This is the Catalog API
              </p>
            </Link>
          </div>
          <div>
            <Link
              to="/api/consumer"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Consumer Customer
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                This is the Customer API
              </p>
            </Link>
          </div>
          <div>
            <Link
              to="/api/service"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Service Provisioning
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                This is Service Provisioning API
              </p>
            </Link>
          </div>
          <div>
            <Link
              to="/api/enterprise"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Enterprise Customers
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                This is Enterprise Customers API
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
