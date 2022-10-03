import React from "react";
import { useNavigate } from "react-router-dom";
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

  return <Menubar model={links} className="mb-3" />;
};

export default Header;
