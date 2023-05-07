import axios from "axios"

const instance = axios.create({
    baseURL : 'http://127.0.0.1:5001/fir-32f4c/us-central1/api' //The API (cloud function) URL
})

export default instance