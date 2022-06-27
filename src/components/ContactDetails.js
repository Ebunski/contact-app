import React from "react";
import image from "../images/babe.jpg";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function ContactDetails(props) {
  const location = useLocation(); //receives state object passed in
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[400px] h-auto rounded-lg shadow-lg overflow-hidden bg-white">
        <div className="h-[400px] object-contain overflow-hidden">
          <img src={image} alt="user" />
        </div>

        <div className="h-[100px] flex flex-col justify-center items-center">
          <div>{location.state.name}</div>
          <div>{location.state.email}</div>
        </div>
      </div>

      <NavLink to={"/"}>
        {" "}
        <button className="mt-3 inline-block bg-blue-500 text-white text-sm rounded px-3 py-2">
          Back to contact list
        </button>
      </NavLink>
    </div>
  );
}
