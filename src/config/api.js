import axios from "axios";

const chattiAPI = axios.create({
    baseURL: 'https://chatti-api-codealong-y.herokuapp.com'
})

chattiAPI.interceptors.request.use(req => {
    const token = sessionStorage.getItem("token")
    console.log("interceptor token:", token)
    if (token) {
        req.headers["Authorization"] = `Bearar ${token}`
    }
    return req
})

export default chattiAPI