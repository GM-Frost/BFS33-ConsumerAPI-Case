import React, { useState, useEffect } from "react";
import Navbar from "../../pages/Navbar";
import axios from "axios";
const ServiceAll = () => {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");

  const handleRadioChange = (serviceID, newStatus) => {
    const serviceIndex = services.findIndex(
      (service) => service.connectionId === serviceID
    );

    if (serviceIndex !== -1) {
      const updatedServices = [...services];

      updatedServices[serviceIndex].status = newStatus;

      setServices(updatedServices);
    }
  };

  const handleSave = async (serviceID) => {
    try {
      const selectedService = services.find(
        (service) => service.connectionId === serviceID
      );

      if (selectedService) {
        let endpoint = "";
        let selectedStatus = "";

        switch (selectedService.status) {
          case "hold":
            endpoint = `http://localhost:9002/api/service/hold/${serviceID}`;
            selectedStatus = "hold";
            break;
          case "resume":
            endpoint = `http://localhost:9002/api/service/resume/${serviceID}`;
            selectedStatus = "resume";
            break;
          case "disable":
            endpoint = `http://localhost:9002/api/service/disable/${serviceID}`;
            selectedStatus = "disable";
            break;
          default:
            break;
        }

        if (endpoint) {
          // Update the status of the selected service
          selectedService.status = selectedStatus;

          const saveService = await axios.put(endpoint, services, {
            headers: { "Content-Type": "application/json" },
          });

          if (saveService.status === 200) {
            setMessage(
              <span
                style={{
                  color: "white",
                  backgroundColor: "green",
                  padding: "5px",
                }}
              >
                Service Saved!
              </span>
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessage(
        <span style={{ color: "red" }}>
          Failed to Save service. Please try again later.
        </span>
      );
    }
  };

  useEffect(() => {
    fetch("http://localhost:9002/api/service/test-qos")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
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
              All Services
            </h1>
            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Device Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Disable </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Hold </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Resume </span>
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Save</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr className="bg-white dark:bg-gray-800">
                    <td
                      colSpan="6"
                      className="text-white-300 text-center  px-6 py-4"
                    >
                      Sorry, No Services to Display
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr
                      key={service.connectionId}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {service.device}
                      </th>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center mr-4">
                          <input
                            id={`hold-radio-${service.connectionId}`}
                            type="radio"
                            value="hold"
                            name={`radio-group-${service.connectionId}`}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={service.status === "hold"}
                            onChange={() =>
                              handleRadioChange(service.connectionId, "hold")
                            }
                          />
                          <label
                            htmlFor={`hold-radio-${service.connectionId}`} // Match the input's ID
                            className="ml-2 text-sm font-medium text-blue-900 dark:text-blue-300"
                          >
                            Hold ⏸️
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center mr-4">
                          <input
                            id={`resume-radio-${service.connectionId}`}
                            type="radio"
                            value="resume"
                            name={`radio-group-${service.connectionId}`}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={service.status === "resume"}
                            onChange={() =>
                              handleRadioChange(service.connectionId, "resume")
                            }
                          />
                          <label
                            htmlFor={`resume-radio-${service.connectionId}`} // Match the input's ID
                            className="ml-2 text-sm font-medium text-green-900 dark:text-green-300"
                          >
                            Resume 🟢
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center mr-4">
                          <input
                            id={`disable-radio-${service.connectionId}`}
                            type="radio"
                            value="disable"
                            name={`radio-group-${service.connectionId}`}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={service.status === "disable"}
                            onChange={() =>
                              handleRadioChange(service.connectionId, "disable")
                            }
                          />
                          <label
                            htmlFor={`disable-radio-${service.connectionId}`} // Match the input's ID
                            className="ml-2 text-sm font-medium text-red-900 dark:text-red-500"
                          >
                            Disable 🔴
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleSave(service.connectionId)}
                          className="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-1 px-3 border border-green-700 hover:border-transparent rounded"
                        >
                          Save
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

export default ServiceAll;
