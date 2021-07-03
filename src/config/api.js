import axios from "axios";

const chattiAPI = axios.create({
    baseURL: 'http://localhost:3000'
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