import React, { useState, useEffect } from 'react';
import useApiHelper from '../../api';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { useToasts } from 'react-toast-notifications';

const BookList = () => {
    const api = useApiHelper();
    const { addToast } = useToasts();
    const [books, setBooks] = useState([]);

    const bookList = () => {
        api.bookList().then(res => {
            setBooks(res)
        })
    }

    const deleteBook = id => {
        api.deleteBook(id).then(res => {
            bookList();
            addToast("Book deleted successfully!", { appearance: 'warning' })
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        bookList();
    }, [])
    return (<>
        <div className='row'>
            <div className="col-lg-8 mx-auto">
                <Link href="/add-book">
                    <a className='btn btn-outline-primary my-3' href="">Add book</a>
                </Link>
                <table className='table mt-3'>
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Reading</th>
                            <th>To Read</th>
                            <th>Completed</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <React.Fragment key={book.id}>
                                <tr>
                                    <td>{book.name}</td>
                                    <td>{book.reading}</td>
                                    <td>{book.to_read}</td>
                                    <td>{book.completed}</td>
                                    <td className='d-flex justify-content-around'>
                                        <Link href={`/book/${book.id}`}>
                                            <div
                                                style={{ 'color': 'blue', 'cursor': 'pointer' }}
                                            >
                                                <BiEdit />
                                            </div>
                                        </Link>
                                        <div
                                            style={{ 'color': 'red', 'cursor': 'pointer' }}
                                            onClick={() => deleteBook(book.id)}
                                        >
                                            <FaTrash />
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}

export default BookList