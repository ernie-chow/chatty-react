import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";

const Header = () => {
  const navigate = useNavigate();

  const links = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Chat",
      icon: "pi pi-fw pi-comment",
      command: () => {
        navigate("/chat");
      },
    },
  ];

  return (
    <>
      <div className="flex w-full justify-content-center bg-primary p-3">
        <Link to="/" className="no-underline">
          <span className="text-white text-5xl font-semibold flex align-items-center">
            <i className="pi pi-comment text-5xl font-bold mr-2"></i>Chatty
          </span>
        </Link>
      </div>
      <Menubar model={links} />
    </>
  );
};

export default Header;
