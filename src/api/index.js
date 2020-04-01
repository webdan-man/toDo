import axios from 'axios'
import {CARDS_API} from './constants'
import {onResponseError, onResponseSuccess} from "./setup";

axios.interceptors.response.use(onResponseSuccess, onResponseError);

const api = {
    getCards() {
        return axios.get(CARDS_API);
    },
    deleteCard(id) {
        return axios.delete(CARDS_API + id);
    },
    getCard(id) {
        return axios.get(CARDS_API + id);
    },
    postCard(params) {
        return axios.post(CARDS_API, params);
    },
    putCard(params) {
        return axios.put(CARDS_API + params.id, params);
    }
};

export default api
