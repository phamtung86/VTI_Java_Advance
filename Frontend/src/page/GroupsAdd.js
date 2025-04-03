import { useState } from "react";
import DepartmentApi from "../api/groupApi";
import "../assets/styles/user/departmentadd.css";
import GroupForm from "../components/GroupForm";
import { handleError } from "../utils/GroupUtils";
import AccountList from "./AccountList";

const GroupAdd = ({ setDisplayStatus, page, refreshDepartmentList, sortBy, types, handleTypeAction }) => {
    const DISPLAY_NONE = 0;
    const DISPLAY_ACCOUNT_LIST = 1;
    const [display, setDisplay] = useState(DISPLAY_NONE);
    const [department, setDepartment] = useState({
        name: "",
        accounts: []
    });
    const handleCancel = () => {
        if (setDisplayStatus) {
            setDisplayStatus(DISPLAY_NONE);
        }
    };

    const handleChangeDepartments = (e) => {
        const { name, value } = e.target;
        setDepartment({
            ...department,
            [name]: value
        });
    };

    const createNewDepartment = async (e) => {
        e.preventDefault();
        if (!department.name.trim()) {
            alert("Group name cannot be blank!");
            return;
        }
        console.log(department.accounts.map(acc => ({ id: acc.id })));
        
        try {
            const response = await DepartmentApi.createNewDepartment({
                name: department.name,
                accounts: department.accounts.map(acc => ({ id: acc.id })),
            });
            
            if (response.status === 200) {
                alert("Create a successful group!");
                refreshDepartmentList(page, sortBy);
                setDisplayStatus(DISPLAY_NONE);
            } else if (response.status === 401) {
                alert("You do not have permission to create groups!");
            } else if (response.status === 404) {
                alert("Group name already exists!");
            }
            else {
                alert("Group creation failed!");
            }
        } catch (error) {
            handleError(error, "creating the group");
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
    };

    const handleOpenAccountList = (value) => {
        if (department.name.trim().length === 0) {
            alert("Please enter group name before adding user!");
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
            {display === DISPLAY_ACCOUNT_LIST &&
                <AccountList
                    departmentName={department.name}
                    display={handleChangeDisplay}
                    dataAccounts={setDataAccounts}
                />
            }
            <GroupForm
                department={department}
                types={types}
                handleChange={handleChangeDepartments}
                handleSubmit={createNewDepartment}
                handleCancel={handleCancel}
                handleReset={() => setDepartment({ name: "", accounts: [] })}
                formTitle="Create New Group"
                isEditMode={false}
                handleTypeAction={handleTypeAction}
                removeAccount={removeAccount}
                handleOpenAccountList={handleOpenAccountList}
            />
        </div>
    );
};

export default GroupAdd;