import React, { useState, useEffect } from "react";
import Navbar from "../../pages/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
const CatalogTable = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [message, setMessage] = useState("");

  const handleDelete = async (catalogID) => {
    try {
      const deleteCatalog = await axios.delete(
        `http://localhost:9001/api/catalog/catalog/${catalogID}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Delete Response:", deleteCatalog);

      // RETRIEVE RESPONSE FROM BACKEND

      if (deleteCatalog.status === 200) {
        setCatalogs((prevCatalogs) =>
          prevCatalogs.filter((catalog) => catalog.id !== catalogID)
        );
        setMessage(
          <span
            style={{
              color: "white",
              backgroundColor: "orange",
              padding: "5px",
            }}
          >
            Catalog Deleted!
          </span>
        );
      }
    } catch (error) {
      setMessage(
        <span style={{ color: "red" }}>
          Failed to Delete Catalog. Please try again later.
        </span>
      );
    }
  };

  useEffect(() => {
    fetch("http://localhost:9001/api/catalog/catalog")
      .then((response) => response.json())
      .then((data) => {
        setCatalogs(data);
      })
      .catch((error) => console.error("Error Fetching Customer Data: ", error));
  }, []);

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
      <div className="flex justify-center items-center h-screen">
        <div className="w-full sm:w-2/3">
          <div className="text-center">{message && <p>{message}</p>}</div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-xs text-white text-bold text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
              All Catalog
            </h1>
            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Catalog Feature
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Catalog Plan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Catalog Product
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {catalogs.length === 0 ? (
                  <tr className="bg-white dark:bg-gray-800">
                    <td
                      colSpan="6"
                      className="text-white-300 text-center  px-6 py-4"
                    >
                      Sorry, No Orders to Display
                    </td>
                  </tr>
                ) : (
                  catalogs.map((catalog) => (
                    <tr
                      key={catalog.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {catalog.feature}
                      </th>
                      <td className="px-6 py-4">{catalog.plan}</td>
                      <td className="px-6 py-4">{catalog.product}</td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`${catalog.id}`}>
                          <button className="bg-transparent hover:bg-yellow-700 text-yellow-700 font-semibold hover:text-white py-1 px-3 border border-yellow-700 hover:border-transparent rounded">
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(catalog.id)}
                          className="bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white py-1 px-3 border border-red-700 hover:border-transparent rounded"
                        >
                          Delete
                        </button>
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

export default CatalogTable;
