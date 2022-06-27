import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateContact(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, email } = location.state;

  const [formData, setFormData] = React.useState({
    id,
    name,
    email,
  });

  function handleChange(event) {
    const { name, value } = event.target; //can use useref too
    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    if (formData.name === "" || formData.email === "") {
      alert("All fields are mandatory");
      return;
    } else {
      props.handleUpdate(formData);
      setFormData({
        name: "",
        email: "",
      });
      navigate("/"); //or can take the path of home page;
    }
  }

  return (
    <section className="">
      <h1 className="text-2xl text-black font-bold pb-5">Update Contact</h1>
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
        <button className="inline-block bg-blue-500 text-white ">Update</button>
      </form>
    </section>
  );
}
