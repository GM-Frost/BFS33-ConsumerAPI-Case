import React, { useEffect, useState } from "react";
import "./style.css";
import backgroundImg from "./image/cardbg-1.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      email: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "userName",
      "email",
      "password",
    ];

    const emptyFields = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (emptyFields.length > 0) {
      setMessage(
        <span style={{ color: "red" }}>
          Please fill in all the required fields.
        </span>
      );
      return;
    }

    //________________________ SPRING BACKEND STARTS________________________
    /* **************************************************************** */

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~ VALIDATE USER BEFORE REGISTER ~~~~~~~~~~~~~~~~~~~~~~//
    try {
      const validateUser = await axios.get(
        `http://localhost:9095/validateuser/${formData.userName}`
      );

      if (validateUser.data.exists) {
        setMessage(
          <span style={{ color: "red" }}>
            User Already Exists. Please choose different Username
          </span>
        );
        return;
      }
    } catch (error) {
      setMessage(
        <span style={{ color: "red" }}>
          Validation Failed. Please try again later.
        </span>
      );
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~ REGISTER USER ~~~~~~~~~~~~~~~~~~~~~~//
    try {
      const registerUser = await fetch("http://localhost:9005/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (registerUser.status === 200) {
        setMessage(
          <span style={{ color: "green" }}>Registration Success!</span>
        );
        resetFormData();
      }
    } catch (error) {
      setMessage(
        <span style={{ color: "red" }}>
          Registration Failed. Please try again later.
        </span>
      );
    }

    /* **************************************************************** */
    //________________________ SPRING BACKEND ENDS__________________________
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      <div className="register flex justify-center items-center h-screen">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-norepeat bg-cover bg-center"
              style={{
                backgroundImage: `url(${backgroundImg})`,
              }}
            >
              <h1 className="text-white text-3xl mb-3">Welcome</h1>
              <div>
                <p className="text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, fugit ipsam nobis suscipit porro, temporibus veniam
                  aspernatur quisquam consequatur quasi unde! Quas vero
                  quibusdam debitis, distinctio excepturi culpa itaque rerum!
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              {message && <p className="text-center">{message}</p>}
              <h2 className="text-3xl mb-4 text-[#422444]">Register</h2>
              <p className="mb-4 text-gray-500">Create your account.</p>
              <form action="#" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleInputChange}
                    value={formData.firstName}
                    className="border border-gray-400 py-1 px-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="border border-gray-400 py-1 px-2 rounded-md"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Username"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border border-gray-400 py-1 px-2 rounded-md w-full"
                  />
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full transition ease-in-out delay-100 bg-[#551e43] hover:bg-[#663053]  py-3 text-center text-white"
                  >
                    Register Now
                  </button>
                </div>
                <div className="mt-5">
                  <p>
                    Already Registered?&nbsp;
                    <Link to="/login" className="text-[#551e43]">
                      Login Here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
