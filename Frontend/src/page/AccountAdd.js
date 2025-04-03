import { useState } from "react";
import '../assets/styles/user/accountModify.css';
import AccountForm from "../components/AccountForm";
import AccountApi from "../api/AccountApi";

const AccountAdd = ({ handleChangeDisplay, departments, refreshAccounts, sortBy, roles }) => {
    const DISPLAY_NONE = 0;
    const [account, setAccount] = useState({
        username: "",
        firstName: "",
        lastName: "",
        role: "EMPLOYEE",
        departmentId: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccount(prevAccount => ({
            ...prevAccount,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!account || !account.username || !account.firstName || !account.lastName || !account.role) {
            alert("Please fill in all required fields.");
            return;
        }
        if(account.username.length < 6 || account.username.length > 20) {
            alert("Username must be between 6 and 20 characters.");
            return;
        }
    
        if(!account.departmentId) {
            alert("Please select a group");
            return;
        } 
    
        try {
            const response = await AccountApi.createAccount(
                {
                    username: account.username,
                    firstName: account.firstName,
                    lastName: account.lastName,
                    role: account.role,
                    departmentId: account.departmentId,
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
    
    const handleCancel = () => {
        if (handleChangeDisplay) {
            handleChangeDisplay(DISPLAY_NONE);
        }
    };

    return (
        <AccountForm
            account={account}
            roles={roles}
            departments={departments}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            formTitle="Create New Account"
            isEditMode={false}
        />
    );
};

export default AccountAdd;
