import React from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

export default function AddContact(props) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      id: nanoid(),
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    if (formData.name === "" || formData.email === "") {
      alert("All fields are mandatory");
      return;
    } else {
      props.handleAdd(formData);
      setFormData({
        name: "",
        email: "",
      });
      navigate("/"); //or can take the path of home page;
    }
  }

  return (
    <section className="">
      <h1 className="text-2xl text-black font-bold pb-5">Add Contact</h1>
      <form
        onSubmit={submitHandler}
        className="w-full h-auto grid grid-cols-1 md:grid-cols-2 auto-rows-[3em] gap-3"
      >
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          className="border indent-2 rounded"
          type={"text"}
          id="name"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
        <label htmlFor="email" className="sr-only">
          email
        </label>
        <input
          className="border indent-2 rounded"
          type={"email"}
          id="email"
          placeholder="Email address"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <button className="inline-block bg-blue-500 text-white ">Add</button>
      </form>
    </section>
  );
}
