import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const myActiveStyle = { color: "orange" };

  return (
    <nav>
      <NavLink activeStyle={myActiveStyle} to="/" exact>
        Home
      </NavLink>
      {" | "}

      <NavLink activeStyle={myActiveStyle} to="/users">
        Users
      </NavLink>
      {" | "}

      <NavLink activeStyle={myActiveStyle} to="/addresses">
        Addresses
      </NavLink>
      {" | "}

      <NavLink activeStyle={myActiveStyle} to="/about">
        About
      </NavLink>
    </nav>
  );
};

export default Header;
