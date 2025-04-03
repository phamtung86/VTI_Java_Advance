import DepartmentApi from "../api/groupApi";

export const fetchDepartmentById = async (departmentID, setDepartment) => {
    try {
        const response = await DepartmentApi.getDepartmentById(departmentID)

        if (response.status === 200) {
            setDepartment(response.data);
        } else {
            alert("Unable to get department information.");
        }
    } catch (error) {
        handleError(error, "retrieving department information");
    }
};

export const handleError = (error, action) => {
    console.error(`Error when ${action}:`, error);
    if (error.response) {
        if (error.response.status === 401) {
            alert("You are not logged in or your session has expired.");
        } else if (error.response.status === 403) {
            alert("You do not have access to department information.");
        } else {
            alert(`Error: ${error.response.status}. Please try again.`);
        }
    } else {
        alert(`An error occurred while ${action}. Please try again.`);
    }
};