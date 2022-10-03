import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex w-full justify-content-center bg-primary p-3">
      <Link to="/" className="no-underline">
        <span className="text-white text-5xl font-semibold flex align-items-center">
          <i className="pi pi-comment text-5xl font-bold mr-2"></i>Chatty
        </span>
      </Link>
    </div>
  );
};

export default Header;
