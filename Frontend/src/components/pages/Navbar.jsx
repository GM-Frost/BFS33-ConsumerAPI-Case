import React from "react";
import "./navbar.css";
import { Link, useParams } from "react-router-dom";
const Navbar = () => {
  const { username } = useParams();

  return (
    <>
      <div className="navcontainer">
        <Link to="/home" className="text">
          <h1>Welcome {username}</h1>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
