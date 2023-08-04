import React, { useEffect, useState } from "react";

import backgroundImg from "./image/cardbg-2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      userName: "",
      password: "",
    });
  };

  // CHECK EMPTY SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["userName", "password"];

    const emptySubmit = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (emptySubmit.length > 0) {
      setMessage(
        <span style={{ color: "red" }}>
          Please fill in all the required fields.
        </span>
      );
      return;
    }

    //________________________ SPRING BACKEND STARTS________________________
    /* **************************************************************** */

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~ VALIDATE LOGIN ~~~~~~~~~~~~~~~~~~~~~~//

    try {
      const validateLogin = await axios.post(
        "http://localhost:9005/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // RETRIVE FROM SPRING BACKEND

      if (validateLogin.status === 200) {
        if (validateLogin.data === "Login successful!") {
          navigate(`/home`);
        } else if (validateLogin.data === "Login failed") {
          setMessage(
            <span style={{ color: "red" }}>Incorrect Username or Password</span>
          );
        }
      } else {
        setMessage(
          <span style={{ color: "red" }}>Login Failed. Please try again!</span>
        );
      }
    } catch (error) {
      setMessage(
        <span style={{ color: "red" }}>Login Failed. Please try again!</span>
      );
    }
    /* **************************************************************** */
    //________________________ SPRING BACKEND ENDS__________________________
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
      <div className="login flex justify-center items-center h-screen">
        <div className="flex flex-col lg:flex-row-reverse w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-norepeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImg})`,
            }}
          >
            <h1 className="text-white text-3xl mb-3">Login to Account.</h1>
            <div>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, fugit ipsam nobis suscipit porro, temporibus veniam
                aspernatur quisquam consequatur quasi unde! Quas vero quibusdam
                debitis, distinctio excepturi culpa itaque rerum!
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            {message && <p>{message}</p>}
            <h2 className="text-3xl mb-4 text-[#a89c7b]">Login</h2>
            <p className="mb-4 text-gray-500">Sign-in to your account.</p>
            <form action="#" onSubmit={handleSubmit}>
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
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border border-gray-400 py-1 px-2 rounded-md w-full"
                />
              </div>

              <div className="mt-5">
                <button className="w-full transition ease-in-out delay-100 bg-[#a89c7b] hover:bg-[#727361]  py-3 text-center text-white">
                  Sign In
                </button>
              </div>
              <div className="mt-5">
                <p>
                  Dont have an account?&nbsp;
                  <Link to="/" className="text-[#a89c7b]">
                    Register Here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
