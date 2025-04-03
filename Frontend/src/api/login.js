import axios from "axios";
import axiosClient from "../configs/axiosClient";
const local = "http://localhost:8080";
const url = "/api/v1/auth";

const login = (username, password) => {
    return axios.post(`${local}${url}/login`, { username, password });
}

const verifyToken = (token) => {
    return axiosClient.get(`${url}/verify-token`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
const Auth = { login, verifyToken };
export default Auth;
