import React from "react";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
    </>
  );
};
export default Nav;
