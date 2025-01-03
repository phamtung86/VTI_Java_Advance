import { useState } from "react";
import "../assets/styles/user/departmentadd.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import AccountList from "./AccountList";

const DepartmentAdd = ({ setDisplayStatus, page, refreshDepartmentList, sortBy, types }) => {
    const DISPLAY_NONE = 0;
    const DISPLAY_ACCOUNT_LIST = 1;
    const [display, setDisplay] = useState(DISPLAY_NONE);
    const [department, setDepartment] = useState({
        name: "",
        type: "PM",
        accounts: []
    });

    const handleCancel = () => {
        if (setDisplayStatus) {
            setDisplayStatus(DISPLAY_NONE);
        }
    };

    // hàm xử lý thay đổi dữ liệu department
    const handleChangeDepartments = (e) => {
        const { name, value } = e.target;
        setDepartment({
            ...department,
            [name]: value
        });
    };

    const createNewDepartment = async (e) => {
        e.preventDefault();

        // Kiểm tra tên phòng ban
        if (!department || department.name.trim().length === 0) {
            alert("Tên phòng ban không được để trống!");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/departments",
                {
                    name: department.name,
                    type: department.type,
                    accounts: department.accounts,
                },
                {
                    headers: {
                        Authorization: `Basic ${btoa(
                            `${localStorage.getItem("USERNAME")}:${localStorage.getItem("PASSWORD")}`
                        )}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Kiểm tra trạng thái phản hồi
            if (response.status === 200) {
                alert("Create a successful department!");
                refreshDepartmentList(page, sortBy);
                setDisplayStatus(DISPLAY_NONE);
            } else if (response.status === 401) {
                alert("You do not have permission to create departments!");
            } else {
                alert("Department creation failed!");
            }
        } catch (error) {
            // Xử lý lỗi chi tiết
            if (error.response) {
                console.error("Error response from server:", error.response);
                if (error.response.status === 401) {
                    alert("You do not have permission to perform this action!");
                } else if (error.response.status === 400) {
                    alert("Invalid data. Please check again!");
                } else {
                    alert("An error occurred while creating the department. Please try again!");
                }
            } else {
                console.error("Unknown error:", error);
                alert("Unable to connect to server. Please check your network connection!");
            }
        }
    };

    const handleChangeDisplay = (value) => {
        setDisplay(value);
    };

    const setDataAccounts = (accounts) => {
        setDepartment((prev) => ({
            ...prev,
            accounts: accounts
        }));
        console.log(accounts);
    };

    const handleOpenAccountList = (value) => {
        if (department.name.trim().length === 0) {
            alert("Please enter department name before adding user!");
            return;
        } else {
            setDisplay(value);
        }
    };

    const removeAccount = (id) => {
        const updatedAccounts = department.accounts.filter(item => item.id !== id);
        setDepartment((prev) => ({
            ...prev,
            accounts: updatedAccounts
        }));
    };

    return (
        <div className="department-crud">
            <form className="department-crud-form">
                {display === DISPLAY_ACCOUNT_LIST &&
                    <AccountList
                        departmentName={department.name}
                        display={handleChangeDisplay}
                        dataAccounts={setDataAccounts}
                    />
                }
                <h1 className="department-crud-title">Create New Department</h1>
                <div className="form-element">
                    <label className="crud-label">Name</label>
                    <input
                        className="crud-value-text"
                        name="name"
                        value={department.name}
                        onChange={handleChangeDepartments}
                        placeholder="Department name..."
                    />
                </div>
                <div className="form-element">
                    <label className="crud-label">Type</label>
                    <select
                        className="crud-value-text"
                        value={department.type}
                        name="type"
                        onChange={handleChangeDepartments}
                    >
                        {types.length > 0 ?
                            types.map((item) => (
                                <option value={item.typeValue}>{item.typeName}</option>
                            ))
                            : ""
                        }
                    </select>
                </div>
                {department.accounts.length > 0 && (
                    <div className="account-list-table">
                        <div className="table-header-account-list">
                            <div className="table-header-data-account-list"></div>
                            <div className="table-header-data-account-list">Username</div>
                            <div className="table-header-data-account-list">Full Name</div>
                            <div className="table-header-data-account-list">Role</div>
                        </div>
                        <div className="table-body-account-list">
                            {department.accounts.map((item) => (
                                <div className="table-rows-account-list" key={item.id}>
                                    <div className="table-data-account-list">
                                        <button type="button" onClick={() => removeAccount(item.id)} className="button-delete">
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                    <div className="table-data-account-list">{item.username}</div>
                                    <div className="table-data-account-list">{item.firstName + " " + item.lastName}</div>
                                    <div className="table-data-account-list">{item.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button
                    className="button-add-account"
                    type="button"
                    onClick={() => handleOpenAccountList(DISPLAY_ACCOUNT_LIST)}
                >
                    Add account
                </button>
                <div className="crud-button">
                    <button
                        className="crud-button-reset"
                        type="reset"
                    >
                        Reset
                    </button>
                    <button
                        className="crud-button-cancel"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="crud-button-submit"
                        type="button"  // Thay type="submit" thành type="button"
                        onClick={createNewDepartment}
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DepartmentAdd;
