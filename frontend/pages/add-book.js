import React, { useState } from "react";
import useApiHelper from "../api";
import { useRouter } from "next/router";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: "",
    reading: false,
    to_read: false,
    completed: false,
  });
  const api = useApiHelper();
  const router = useRouter();
  const { addToast } = useToasts();

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // Create a new object to represent the updated form data
    const updatedFormData = {
      ...formData,
      [name]: checked, // Update the clicked checkbox
    };

    // If the clicked checkbox is set to true, unselect the others
    if (checked) {
      if (name === "reading") {
        updatedFormData.to_read = false;
        updatedFormData.completed = false;
      } else if (name === "to_read") {
        updatedFormData.reading = false;
        updatedFormData.completed = false;
      } else if (name === "completed") {
        updatedFormData.reading = false;
        updatedFormData.to_read = false;
      }
    }

    // Update the state with the new form data
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .addBook(formData)
      .then((res) => {
        router.push("/");
        addToast("Book added successfully!", { appearance: "success" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <h4 className="text-center">Add Book</h4>
        <hr />
        <form onSubmit={handleSubmit} action="">
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="name">
              Book Name
            </label>
            <input
              type="text"
              onChange={handleNameChange}
              name="name"
              className="form-control"
              value={formData.name}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Reading </label>
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              name="reading"
              checked={formData.reading}
              className="form-check-input"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">To Read </label>
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              name="to_read"
              checked={formData.to_read}
              className="form-check-input"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Completed </label>
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              name="completed"
              checked={formData.completed}
              className="form-check-input"
            />
          </div>
          <div className="form-group mb-3">
            <button type="submit" className="btn btn-primary w-100 my-3">
              Add
            </button>
            <Link href="/">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
