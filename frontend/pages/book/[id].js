import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useApiHelper from "../../api";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";

const EditBook = (props) => {
  const api = useApiHelper();
  const router = useRouter();
  const { addToast } = useToasts();

  const [book, setBook] = useState({});

  const handleChange = (e) => {
    const { name, type, checked } = e.target;

    // an object to keep track of checkbox statuses
    const newStatuses = {
      reading: book.reading,
      to_read: book.to_read,
      completed: book.completed,
    };

    // update the status of the clicked checkbox
    newStatuses[name] = type === "checkbox" ? checked : e.target.value;

    // only one status can be true
    if (type === "checkbox" && checked) {
      for (const status in newStatuses) {
        if (status !== name) {
          newStatuses[status] = false;
        }
      }
    }

    setBook({
      ...book,
      ...newStatuses,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .updateBook(props.id, book)
      .then((res) => {
        router.push("/");
        addToast("Book updated successfully!", { appearance: "success" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    api
      .bookDetails(props.id)
      .then((res) => {
        setBook({
          name: res.name,
          reading: res.reading,
          to_read: res.to_read,
          completed: res.completed,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.id]);

  return (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <h4 className="text-center">Edit Book</h4>
        <hr />
        <form onSubmit={handleSubmit} action="">
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="name">
              Book Name
            </label>
            <input
              value={book.name ? book.name : ""}
              type="text"
              onChange={handleChange}
              name="name"
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="reading">
              Reading
            </label>
            <input
              type="checkbox"
              onChange={handleChange}
              name="reading"
              checked={book.reading}
              className="form-check-input"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="to_read">
              To Read
            </label>
            <input
              type="checkbox"
              onChange={handleChange}
              name="to_read"
              checked={book.to_read}
              className="form-check-input"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="completed">
              Completed
            </label>
            <input
              type="checkbox"
              onChange={handleChange}
              name="completed"
              checked={book.completed}
              className="form-check-input"
            />
          </div>
          <div className="form-group mb-3">
            <button type="submit" className="btn btn-primary w-100 my-3">
              Update
            </button>
            <Link href="/">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;

export async function getServerSideProps(context) {
  return {
    props: { id: context.params.id },
  };
}
