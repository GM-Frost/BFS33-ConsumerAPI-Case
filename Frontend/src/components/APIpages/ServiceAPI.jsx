import React, { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
const ServiceAPI = () => {
  const [serviceForm, setServiceForm] = useState({
    device: "",
    status: "",
  });
  const resetServiceForm = () => {
    setServiceForm({
      device: "",
      status: "",
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceForm({ ...serviceForm, [name]: value });
  };
  const [message, setMessage] = useState("");

  const handleCreateService = async (e) => {
    e.preventDefault();
    const requiredFields = ["device", "status"];
    const emptyFields = requiredFields.filter(
      (field) => !serviceForm[field].trim()
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
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~ CREATE SERVICE ~~~~~~~~~~~~~~~~~~~~~~//
    try {
      const createService = await axios.post(
        "http://localhost:9002/api/service/provision",
        serviceForm,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // RETRIEVE RESPONSE FROM BACKEND

      if (createService.status === 200) {
        setMessage(
          <span
            style={{ color: "white", backgroundColor: "green", padding: "4px" }}
          >
            Service Created!
          </span>
        );
        resetServiceForm();
      }
    } catch (error) {
      setMessage(
        <span style={{ color: "red" }}>
          Failed to Create Service. Please try again later.
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
              <h2 className="text-3xl mb-4 text-[#422444]">
                Service Provisioning
              </h2>
              <form action="#" onSubmit={handleCreateService}>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Device Name"
                    name="device"
                    value={serviceForm.device}
                    onChange={handleInputChange}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-1">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select an option
                  </label>
                  <select
                    name="status"
                    value={serviceForm.status}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled>Choose Status</option>
                    <option value="hold">Hold</option>
                    <option value="resume">Resume</option>
                    <option value="disable">Disable</option>
                  </select>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full transition ease-in-out delay-100 bg-[#1e293b] hover:bg-[#663053]  py-3 text-center text-white"
                  >
                    Create Service
                  </button>
                </div>
                <div className="mt-5">
                  <Link to="/api/service/test-qos">
                    <button className="float-right w-sm text-xs transition ease-in-out delay-100 bg-[#663053] p-1 rounded-lg text-center text-white">
                      View All Services
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

export default ServiceAPI;
