import axios from "axios";
import axiosClient from "../configs/axiosClient";
const url = "/api/v1/accounts";
const local = "http://localhost:8080";

const register = (account) => {
    return axiosClient.post(`${url}/register`, account);
};

const getAllPaging = (params) => {
    return axiosClient.get(`${url}/page`, { params }); 
};

const getRoles = () => {
    return axiosClient.get(`${url}/roles`);
};

const createAccount = (data) => {
    return axiosClient.post(`${url}`, data);
};

const deleteAccount = (ids) => {
    return axiosClient.delete(`${url}`, {
        data: { ids }
    });
};

const getListAccountById = (ids) => {
    return axiosClient.get(`${url}/ids`, {
        params: { ids: ids.join(",") }
    });
};

const updateAccount = (data) => {
    return axiosClient.put(`${url}`, data);
};

const getAllAccountsNoDepartment = () => {
    return axiosClient.get(`${url}`)
}

const resetPassword = (email) => {
    return axios.post(`${local}${url}/resetPassword?email=${email}`)
}

const validateToken = (token) => {
    return axios.get(`${local}${url}/change-password?token=${token}`)
}

const changePassword = (data) => {
    return axios.post(`${local}${url}/savePassword`, data)
}

const registerAccount = (data) => {
    return axios.post(`${local}${url}/register`, data)
}

const updatePassword = (userName, data) => {
    return axios.put(`${local}${url}/update-password/username/${userName}`, data)
}

const activeAcount = (token) => {
    return axios.post(`${local}${url}/active-account?token=${token}`)
}

const findAccountById = (id) => {
    return axiosClient.get(`${url}/id/${id}`);
}

const editProfile = (username, formData) => {
    return axiosClient.post(`${url}/edit-profile/${username}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, 
    });    
};

const AccountApi = { 
    register, 
    getAllPaging, 
    getRoles, 
    createAccount, 
    deleteAccount, 
    getListAccountById, 
    updateAccount,
    getAllAccountsNoDepartment,
    resetPassword,
    validateToken,
    changePassword,
    registerAccount,
    updatePassword,
    activeAcount,
    findAccountById,
    editProfile
 };
export default AccountApi;