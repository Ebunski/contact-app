import React, { useEffect } from "react";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import ContactDetails from "./components/ContactDetails";
import UpdateContact from "./components/UpdateContact";
import axios from "./axios.js";
// import DeleteMessage from "./components/DeleteMessage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

//beginning
export const deleteContext = React.createContext();

export default function App() {
  const [contacts, setContacts] = React.useState(
    // () => JSON.parse(localStorage.getItem("contactList")) || []
    []
  );
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);

  //functions below

  useEffect(() => {
    async function retrieveContacts() {
      const response = await axios.get("/contacts_data"); //contacts_data reps the key in the api (like local storage)
      const allContacts = await response.data; //gets the data part
      allContacts && setContacts(allContacts);
    }
    retrieveContacts();
  }, []);

  async function handleAdd(input) {
    const response = await axios.post("/contacts_data", input);
    setContacts((prev) => [...prev, response.data]);
  }

  async function handleUpdate(input) {
    const response = await axios.put(`/contacts_data/${input.id}`, input);
    setContacts((prev) => prev.map((x) => (x.id === input.id ? input : x)));
  }

  function handleSearch(keyword) {
    setSearch(keyword);
    const searchElements = contacts.filter((x) =>
      x.name.toLowerCase().includes(keyword.toLowerCase())
    );
    search && setSearchResult(searchElements);
  }

  // useEffect(() => {
  //   localStorage.setItem("contactList", JSON.stringify(contacts));
  // }, [contacts]);

  async function handleDelete(id) {
    await axios.delete(`/contacts_data/${id}`);
    setContacts((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <Router>
      <deleteContext.Provider value={handleDelete}>
        <Header />
        <div className="w-full p-5">
          <Routes>
            <Route
              path="/"
              element={
                <ContactList
                  database={search ? searchResult : contacts}
                  search={search}
                  handleSearch={handleSearch}
                />
              }
            />
            <Route path="/add" element={<AddContact handleAdd={handleAdd} />} />
            <Route
              path="/update"
              element={<UpdateContact handleUpdate={handleUpdate} />}
            />
            <Route path="/contact/:id" element={<ContactDetails />} />
            <Route path="*" element={<Navigate replace to={"/"} />} />

            {/* <Route path="/delete" element={<DeleteMessage />} /> */}
          </Routes>
        </div>
      </deleteContext.Provider>
    </Router>
  );
}
