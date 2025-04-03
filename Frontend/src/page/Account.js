import { useEffect, useState } from "react";

import '../assets/styles/user/account.css';
import AccountTable from "../components/AccountTable";
import ListType from "../components/ListType";
import Paging from "../components/Paging";
import Feature from "../components/Feature";
import AccountAdd from "./AccountAdd";
import AccountModify from './AccountModify';
import GroupList from "../components/GroupList";
import AccountApi from '../api/AccountApi';
import GroupApi from "../api/groupApi";

const DISPLAY_NONE = 0;
const DISPLAY_ADD = 1;
const DISPLAY_MODIFY = 2;
const Account = () => {
    const [accounts, setAccounts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Lưu giá trị debounce
    const [sortBy, setSortBy] = useState("createDate,desc");
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        role: "",
        departmentId: ""
    });
    const [departments, setDepartments] = useState([]);
    const [display, setDisplay] = useState(DISPLAY_NONE);
    const [selectedID, setSelectedID] = useState([]);
    const [roles, setRoles] = useState([])

    const sort = [
        { name: "Name A-Z", value: "fullName,asc" },
        { name: "Name Z-A", value: "fullName,desc" },
        { name: "Group A-Z", value: "department,asc" },
        { name: "Group Z-A", value: "department,desc" }
    ];

    // Hàm để gọi API
    const fetchDataAccount = async (pageNumber, sortBy, search, role, departmentId) => {
        setLoading(true);
        try {
            const response = await AccountApi.getAllPaging({
                pageNumber,
                size: 10,
                sort: sortBy,
                search: search,
                role: role,
                departmentId: departmentId
            });

            if (response.status === 200) {
                setAccounts(response.data.content);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.log("Error while retrieving user data: " + error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await GroupApi.getAll();
            if (response.status === 200) {
                setDepartments(response.data);
            }
        } catch (error) {
            console.log("An error occurred while get department", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await AccountApi.getRoles();
            if (response.status === 200) {
                setRoles(response.data)
            }
        } catch (error) {
            console.log("An error occurred while get roles");

        }
    }

    useEffect(() => {
        fetchRoles();
    }, [])


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch dữ liệu khi có thay đổi
    useEffect(() => {
        fetchDataAccount(page, sortBy, debouncedSearchTerm, filters.role, filters.departmentId);
    }, [page, sortBy, debouncedSearchTerm, filters]); 
    // Xử lý thay đổi filter
    const handleChangeFilter = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleChangeDisplay = (value) => {
        setDisplay(value);
    };

    const handleCheckboxChange = (id, isChecked) => {
        if (isChecked) {
            setSelectedID((prevSelected) => [...prevSelected, id]);
        } else {
            setSelectedID((prevSelected) =>
                prevSelected.filter((accountId) => accountId !== id)
            );
        }
    };

    const handleModify = () => {    
        if (selectedID.length === 0) {
            alert("You must select an account to modify");
        } else if (selectedID.length === 1) {
            setDisplay(DISPLAY_MODIFY);
        } else {
            alert("You can only select one account for modification.");
        }
    };

    const deleteAccount = async (id) => {
        try {
            const response = await AccountApi.deleteAccount(id);
            if (response.status === 200) {
                alert("Delete account success");
                fetchDataAccount(page, sortBy, debouncedSearchTerm, filters.role, filters.departmentId);
                setSelectedID([]);
            }
        } catch (error) {
            console.log("Error deleting account:", error);
            alert("Delete account failed: " + error.message);
        }

    };


    const handleDelete = () => {
        if (selectedID.length === 0) {  // Kiểm tra nếu selectedID rỗng hoặc không hợp lệ
            alert("You must select an account to remove");
        } else {
            if (window.confirm("Do you want remove this account ?")) {
                deleteAccount(selectedID);
            }
        }
    };


    return (
        <div className="account">
            {display === DISPLAY_MODIFY &&
                <AccountModify
                    id={selectedID}
                    handleChangeDisplay={handleChangeDisplay}
                    refreshAccounts={fetchDataAccount}
                    sortBy={sortBy}
                    departments={departments}
                    roles={roles}
                    page={page}
                />
            }
            {display === DISPLAY_ADD &&
                <AccountAdd
                    handleChangeDisplay={handleChangeDisplay}
                    refreshAccounts={fetchDataAccount}
                    sortBy={sortBy}
                    departments={departments}
                    roles={roles}
                />
            }
            <div className="department-filter">
                <div className="filter-type">
                    <GroupList
                        departments={departments}
                        handleChangeFilter={handleChangeFilter}
                    />
                </div>
                <div className="filter-type">
                    <ListType
                        type={roles}
                        handleChangeFilter={handleChangeFilter}
                    />
                </div>
            </div>
            <Feature
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setDisplay={setDisplay}
                sortBy={sortBy}
                setSortBy={setSortBy}
                handleModify={handleModify}
                handleDelete={handleDelete}
                sort={sort}
                setHandleTypeAction={() => { }}
            />
            <AccountTable
                accounts={accounts}
                selectedID={selectedID}
                handleCheckboxChange={handleCheckboxChange}
                loading={loading}
            />
            <Paging
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />
        </div>
    );
};

export default Account;
