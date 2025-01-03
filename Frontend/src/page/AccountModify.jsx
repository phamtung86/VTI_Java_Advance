import axios from "axios";
import { useEffect, useState } from "react";
import '../assets/styles/user/accountModify.css';

const AccountModify = ({ id, handleChangeDisplay, departments, refreshAccounts, sortBy,roles,page }) => {
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
            const response = await axios.get(`http://localhost:8080/api/v1/accounts/id`, {
                params: { ids: id.join(",") },
                headers: {
                    'Authorization': `Basic ${btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD"))}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                setAccount({
                    id: response.data[0].id,
                    username: response.data[0].username,
                    firstName: response.data[0].firstName,
                    lastName: response.data[0].lastName,
                    role: response.data[0].role,
                    departmentId: response.data[0].departmentId, 
                });
                console.log(response.data[0]);
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
            fetchAccountById(id); // Gọi API khi id thay đổi
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setAccount(prevAccount => ({
                ...prevAccount,
                [name]: value
            }));
        // }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(account.departmentId === null || account.departmentId === 0) {
            alert("Please select a department");
        } else {
            try {
                const response = await axios.put(`http://localhost:8080/api/v1/accounts`, {
                    ...account,
                }, {
                    headers: {
                        'Authorization': `Basic ${btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD"))}`,
                        'Content-Type': 'application/json',
                    }
                });
        
                if (response.status === 200) {
                    alert("Account updated successfully!");
                    handleChangeDisplay(DISPLAY_NONE);
                    refreshAccounts(page, sortBy); // Refresh dữ liệu sau khi cập nhật
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
        <div className="account-crud">
            <form onSubmit={handleSubmit} className="account-crud-form">
                <h1 className="account-crud-title">Update Account</h1>
                <div className="crud-label-value">
                    <label htmlFor="username" className="account-crud-label">Username</label>
                    <input
                        className="account-crud-value"
                        value={account.username}
                        name="username"
                        onChange={handleInputChange}
                        disabled
                    />
                </div>
                <div className="crud-label-value">
                    <label htmlFor="firstName" className="account-crud-label">First Name</label>
                    <input
                        className="account-crud-value"
                        value={account.firstName}
                        name="firstName"
                        onChange={handleInputChange}
                        disabled
                    />
                </div>
                <div className="crud-label-value">
                    <label htmlFor="lastName" className="account-crud-label">Last Name</label>
                    <input
                        className="account-crud-value"
                        value={account.lastName}
                        name="lastName"
                        onChange={handleInputChange}
                        disabled
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

export default AccountModify;
