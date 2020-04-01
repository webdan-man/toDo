import axios from 'axios'
// import * as qs from "qs";

export const onRequest = config => {
    return config;
};

export const onResponseSuccess = response => {
    return response.data;
};

export const onResponseError = async error => {
    let message = `Oops, failed to establish connection to the server:(`;

    if (error.response) {
        message = error.response.data.message;
        if (error.response.status === 401) {
            console.error('401 => ' + message)
        }
        if (error.response.status === 400 || error.response.status === 403) {
            console.error('400 || 403 => ' + message)
        }
        if (error.response.status === 404) {
            console.error('404 => ' + message)
        }
    }
    throw Error(message)
};

export default axios
