import axios from 'axios';
import logService from './logService'
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
    const expectedErrror = error.response && error.response.status >= 400 && error.response.status < 500
    if (!expectedErrror) {
        logService.log(error);
        console.log("Loggin error", error);
        // toast.error("an unexpected error occurred");
        // alert("an unexpected error occurred with movie");

        // or
        toast("an unexpected error occurred");
    }
    return Promise.reject(error);

});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
}