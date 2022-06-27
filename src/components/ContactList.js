import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { NavLink } from "react-router-dom";

export default function ContactList(props) {
  const contactElements = props.database.map((x) => (
    <ContactCard key={x.id} {...x} />
  ));

  const inputRef = useRef("");

  function getSearchItem() {
    props.handleSearch(inputRef.current.value);
  }

  return (
    <>
      <div className="border-gray-200 border-b-2 pb-3">
        <div className="flex items-center justify-between ">
          <h1 className="text-3xl text-black font-bold pb-5"> Contact List</h1>
          <NavLink to={"/add"}>
            {" "}
            <button className="inline-block bg-blue-500 text-white text-sm rounded px-3 py-2">
              Add Contact
            </button>
          </NavLink>
        </div>

        <div>
          <input
            ref={inputRef}
            //useref vs event.target
            //---state: no need for name (as it is a single item)
            //---use: mainly for single item form
            //--form: ref added
            //---function: inputRef.current.value vs event.target.value

            type={"text"}
            placeholder="Search Contacts"
            className="border-gray border-2 w-full py-1 rounded-md outline-gray-200 indent-4 flex items-center justify-between"
            value={props.search}
            onChange={getSearchItem}
          />
        </div>
      </div>
      {contactElements.length > 0 ? contactElements : "No contacts found"}
    </>
  );
}
