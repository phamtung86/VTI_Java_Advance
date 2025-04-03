import { useEffect, useState } from "react";
import AccountForm from "../components/AccountForm";
import '../assets/styles/user/accountModify.css';
import AccountApi from "../api/AccountApi";
const AccountModify = ({ id, handleChangeDisplay, departments, refreshAccounts, sortBy, roles, page }) => {
    console.log(id);
    
    const DISPLAY_NONE = 0;
    const [account, setAccount] = useState({
        id: id,
        username: "",
        firstName: "",
        lastName: "",
        role: "",
        departmentId: ""
    });

    const fetchAccountById = async (id) => {
        try {
            const response = await AccountApi.findAccountById(id)
            
            if (response.status === 200) {
                setAccount({
                    id: response.data.id,
                    username: response.data.username,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    role: response.data.role,
                    departmentId: response.data.departmentId, 
                });
            } else {
                alert("Unable to get user information");
            }
        } catch (error) {
            console.error("Error getting user information:", error);
            alert("An error occurred while retrieving user information. Please try again.");
        }
    };

    useEffect(() => {
        if (id.length > 0) {
            fetchAccountById(id);
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccount(prevAccount => ({
            ...prevAccount,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(account.departmentId === null || account.departmentId === 0) {
            alert("Please select a department");
        } else {
            try {
                const response = await AccountApi.updateAccount(account);
        
                if (response.status === 200) {
                    alert("Account updated successfully!");
                    handleChangeDisplay(DISPLAY_NONE);
                    refreshAccounts(page, sortBy);
                }
            } catch (error) {
                console.error("Error updating account:", error);
                alert("An error occurred while updating your account. Please try again.");
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
            formTitle="Update Account"
            isEditMode={true}
        />
    );
};

export default AccountModify;