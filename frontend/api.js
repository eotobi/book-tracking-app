import useInterCeptor from "./interceptors";


const useApiHelper = () => {
    const axios = useInterCeptor();

    const api = {
        addBook: (data, params = {}) => axios.post(`api/v1/add-book/`, data, params),
        bookDetails: (id, params = {}) => axios.get(`api/v1/book-details/${id}`, params),
        bookList: (params = {}) => axios.get(`api/v1/book-list/`, params),
        deleteBook: (id, params = {}) => axios.delete(`api/v1/delete-book/${id}`, params),
        updateBook: (id, data, params = {}) => axios.put(`api/v1/book-update/${id}/`, data, params)
    }

    return api;
}

export default useApiHelper;