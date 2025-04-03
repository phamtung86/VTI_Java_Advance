import axiosClient from "../configs/axiosClient";

const url = "/api/v1/departments"

const getDepartmentsPaging = (params) => {
    return axiosClient.get(`${url}`, {params})
}

const getAll = () => {
    return axiosClient.get(`${url}/list`)
}

const getTypes = () => {
    return axiosClient.get(`${url}/types`)
}

const deleteDepartment = (id) => {
    return axiosClient.delete(`${url}/id/${id}`)
}

const createNewDepartment = (data) => {
    return axiosClient.post(`${url}`, data)
}

const updateDepartment = (id, data) => {
    return axiosClient.put(`${url}/${id}`, data)
}

const getDepartmentById = (id) =>{
    return axiosClient.get(`${url}/${id}`)
}

const DepartmentApi = {
    getAll,
    getDepartmentsPaging, 
    getTypes,deleteDepartment, 
    createNewDepartment,
    updateDepartment,
    getDepartmentById
}
export default DepartmentApi;