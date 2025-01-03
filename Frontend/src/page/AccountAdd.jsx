import axios from "axios";
import {useState } from "react";
import '../assets/styles/user/accountModify.css';

const AccountAdd = ({handleChangeDisplay, departments, refreshAccounts, sortBy,roles }) => {
    const DISPLAY_NONE = 0;
    const [account, setAccount] = useState({
        username: "",
        firstName: "",
        lastName: "",
        role: "EMPLOYEE",
        departmentId: ""
    });

    const [error, setError] = useState({
        username: "",
        firstName: "",
        lastName: "",
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setAccount(prevAccount => ({
                ...prevAccount,
                [name]: value
            }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Kiểm tra dữ liệu
        if (!account || !account.username || !account.firstName || !account.lastName || !account.role) {
            alert("Please fill in all required fields.");
            return;
        }
        if(account.username.length < 6 || account.username.length > 20) {
            alert("Username must be between 6 and 20 characters.");
            return;
        }
    
        const username = localStorage.getItem("USERNAME");
        const password = localStorage.getItem("PASSWORD");
    
        if (!username || !password) {
            alert("Authorization failed. Please log in again.");
            return;
        }
        if(!account.departmentId) {
            alert("Please select a department");
            return;
        } 
    
        try {
            const response = await axios.post(
                `http://localhost:8080/api/v1/accounts`,
                {
                    username: account.username,
                    firstName: account.firstName,
                    lastName: account.lastName,
                    role: account.role,
                    departmentId: account.departmentId,
                },
                {
                    headers: {
                        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                        "Content-Type": "application/json",
                    },
                }
            );
    
            if (response.status === 200 || response.status === 201) {
                alert("Create account success");
                handleChangeDisplay(DISPLAY_NONE);
                refreshAccounts(1, sortBy);
            }
        } catch (error) {
            if (error.response) {
                console.error("Server error:", error.response.data);
                alert(`Error: ${error.response.data.message || "An unexpected error occurred."}`);
            } else if (error.request) {
                console.error("No response received:", error.request);
                alert("No response from the server. Please check your connection.");
            } else {
                console.error("Request setup error:", error.message);
                alert("An error occurred while creating the account.");
            }
        }
    };
    

    const checkErrorCreate = () => {

    }
    
    const handleCancel = () => {
        if (handleChangeDisplay) {
            handleChangeDisplay(DISPLAY_NONE);
        }
    };

    return (
        <div className="account-crud">
            <form onSubmit={handleSubmit} className="account-crud-form">
                <h1 className="account-crud-title">Create New Account</h1>
                <div className="crud-label-value">
                    <label htmlFor="username" className="account-crud-label">Username</label>
                    <input
                        className="account-crud-value"
                        value={account.username}
                        name="username"
                        onChange={handleInputChange}                      
                    />
                </div>
                <div className="crud-label-value">
                    <label htmlFor="firstName" className="account-crud-label">First Name</label>
                    <input
                        className="account-crud-value"
                        value={account.firstName}
                        name="firstName"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="crud-label-value">
                    <label htmlFor="lastName" className="account-crud-label">Last Name</label>
                    <input
                        className="account-crud-value"
                        value={account.lastName}
                        name="lastName"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="crud-label-value">
                    <label htmlFor="role" className="account-crud-label">Role</label>
                    <select name="role" id="role" className="account-crud-value" value={account.role} onChange={handleInputChange}>
                        {roles.length > 0 ? 
                            roles.map((item) => (
                                <option value={item.roleValue}>{item.roleName}</option>

                            ))
                        : ""}       
                    </select>
                </div>
                <div className="crud-label-value">
                    <label htmlFor="department" className="account-crud-label">Department</label>
                    <select name="departmentId" id="department" className="account-crud-value" value={account.departmentId} onChange={handleInputChange}>
                        <option value="0">Unknown</option>
                        {departments.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="account-crud-actions">
                    <button type="button" className="account-crud-cancel" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="account-crud-submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default AccountAdd;
