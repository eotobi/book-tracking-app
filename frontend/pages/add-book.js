import React, { useState } from 'react';
import useApiHelper from '../api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';

const AddBook = () => {
    const [formData, setFormData] = useState({ name: '', reading: false, toRead: false, completed: false });
    const api = useApiHelper();
    const router = useRouter();
    const { addToast } = useToasts();

    const handleChange = (e) => {
        const { name, checked } = e.target;
        // Reset all checkboxes to false, except the one that was clicked
        setFormData({
            ...formData,
            reading: false,
            toRead: false,
            completed: false,
            [name]: checked,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api
            .addBook(formData)
            .then((res) => {
                router.push('/');
                addToast('Book added successfully!', { appearance: 'success' });
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
                            onChange={handleChange}
                            name="name"
                            className="form-control"
                            value={formData.name}
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
                            checked={formData.reading}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="toRead">
                            To Read
                        </label>
                        <input
                            type="checkbox"
                            onChange={handleChange}
                            name="toRead"
                            checked={formData.toRead}
                            className="form-control"
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
                            checked={formData.completed}
                            className="form-control"
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
