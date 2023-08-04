import React, { useEffect, useState } from "react";
import Navbar from "../../pages/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const CatalogEdit = () => {
  const [message, setMessage] = useState("");
  const { catalogID } = useParams();
  const [catalogs, setCatalogs] = useState({
    feature: "",
    plan: "",
    product: "",
  });

  const handleCatalogChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCatalogs((prevcatalogs) => ({
      ...prevcatalogs,
      [name]: value,
    }));
  };

  const handleCatalogSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["feature", "plan", "product"];

    //________________________ SPRING BACKEND STARTS________________________
    /* **************************************************************** */
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~ EDIT CATALOG ~~~~~~~~~~~~~~~~~~~~~~//

    try {
      const editcatalogs = await axios.put(
        `http://localhost:9001/api/catalog/catalog/${catalogID}`,
        catalogs,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // RETRIEVE RESPONSE FROM BACKEND

      if (editcatalogs.status === 200) {
        setMessage(
          <span
            style={{ color: "white", backgroundColor: "green", padding: "4px" }}
          >
            Catalog EDITED!
          </span>
        );
      }
    } catch (error) {
      setMessage(
        <span style={{ color: "red" }}>
          Failed to Edit Catalog. Please try again later.
        </span>
      );
    }
  };

  useEffect(() => {
    fetch(`http://localhost:9001/api/catalog/catalog/${catalogID}`)
      .then((response) => response.json())
      .then((data) => {
        setCatalogs(data);
      })
      .catch((error) => console.error("Error Fetching Order Data: ", error));
  }, [catalogID]);

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
              <form onSubmit={handleCatalogSubmit}>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Catalog Feature"
                    name="feature"
                    required
                    onChange={handleCatalogChange}
                    value={catalogs.feature}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Catalog Plan"
                    name="plan"
                    required
                    onChange={handleCatalogChange}
                    value={catalogs.plan}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Catalog Product"
                    name="product"
                    required
                    onChange={handleCatalogChange}
                    value={catalogs.product}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full transition ease-in-out delay-100 bg-[#ba9195] hover:bg-[#663053]  py-3 text-center text-white"
                  >
                    Edit Catalog
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

export default CatalogEdit;
