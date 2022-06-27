import React from "react";
import { useContext } from "react";
import { deleteContext } from "../App";
import { Outlet, useNavigate } from "react-router-dom";

export default function ContactCard(props) {
  const { name, email, id } = props;
  const navigate = useNavigate();
  const deleteHandler = useContext(deleteContext);

  return (
    <div className="border-gray-200 border-b-2 bg-white flex items-center justify-between px-3">
      <div className="py-4">
        <div
          className="font-bold text-black cursor-pointer"
          onClick={() => navigate(`/contact/${id}`, { state: props })}
        >
          {name}
        </div>

        <div
          className="text-sm text-gray-700 cursor-pointer"
          onClick={() => navigate(`/contact/${id}`, { state: props })}
        >
          {email}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          className="text-xs bg-red-500 p-2 text-white"
          onClick={() => deleteHandler(id)} // onClick={() => navigate("/delete")}
        >
          Delete
        </button>
        <button
          className="text-xs bg-blue-700 p-2 text-white"
          onClick={() => navigate("/update", { state: props })}
        >
          Update
        </button>
        <Outlet />
      </div>
    </div>
  );
}
