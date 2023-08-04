import React, { useState, useEffect } from "react";
import Navbar from "../pages/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const CatlogAPI = () => {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~ FOR CATALOG FORM ~~~~~~~~~~~~~~~~~~~~~~//

  const [catalogForm, setCatalogForm] = useState({
    feature: "",
    plan: "",
    product: "",
  });

  const [message, setMessage] = useState("");

  const resetCatalogForm = () => {
    setCatalogForm({
      feature: "",
      plan: "",
      product: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCatalogForm({ ...catalogForm, [name]: value });
  };

  const handleCreateConsumer = async (e) => {
    e.preventDefault();

    const requiredFields = ["feature", "plan", "product"];

    const emptyFields = requiredFields.filter(
      (field) => !catalogForm[field].trim()
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
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~ CREATE CATALOG ~~~~~~~~~~~~~~~~~~~~~~//
    try {
      const createConsumer = await axios.post(
        "http://localhost:9001/api/catalog/catalog",
        catalogForm,
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
            Catalog Created!
          </span>
        );
        resetCatalogForm();
      }
    } catch (error) {
      setMessage(
        <span style={{ color: "red" }}>
          Failed to Create Catalog. Please try again later.
        </span>
      );
    }
  };

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
              <h2 className="text-3xl mb-4 text-[#422444]">Catalog</h2>
              <form action="#" onSubmit={handleCreateConsumer}>
                <div className="mt-5">
                  <div className="grid grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder="Catalog Feature"
                      name="feature"
                      value={catalogForm.feature}
                      onChange={handleInputChange}
                      className="border border-gray-400 py-1 px-2 rounded-md w-full"
                    />
                    <input
                      type="text"
                      placeholder="Catalog Plan"
                      name="plan"
                      value={catalogForm.plan}
                      onChange={handleInputChange}
                      className="border border-gray-400 py-1 px-2 rounded-md w-full"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Catalog Product"
                    name="product"
                    value={catalogForm.product}
                    onChange={handleInputChange}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full transition ease-in-out delay-100 bg-[#1e293b] hover:bg-[#663053]  py-3 text-center text-white"
                  >
                    Create Catalog
                  </button>
                </div>
                <div className="mt-5">
                  <Link to="/api/catalog/catalog">
                    <button className="float-right w-sm text-xs transition ease-in-out delay-100 bg-[#663053] p-1 rounded-lg text-center text-white">
                      View All Catalogs
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

export default CatlogAPI;
