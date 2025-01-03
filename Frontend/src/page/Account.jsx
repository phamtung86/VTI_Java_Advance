import { faPenToSquare, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import dayjs from "dayjs";
import qs from 'qs';
import { useEffect, useState } from "react";
import '../assets/styles/user/account.css';
import AccountAdd from "./AccountAdd";
import AccountModify from './AccountModify';

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
    const DISPLAY_NONE = 0;
    const [display, setDisplay] = useState(DISPLAY_NONE);
    const DISPLAY_ADD = 1;
    const DISPLAY_MODIFY = 2;
    const [selectedID, setSelectedID] = useState([]);
    const [roles, setRoles] = useState([])
    // Hàm để gọi API
    const fetchDataAccount = async (pageNumber, sortBy) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/accounts/page`, {
                params: {
                    pageNumber,
                    size: 10,
                    sort: sortBy,
                    search: debouncedSearchTerm, // Sử dụng giá trị debounce
                    role : filters.role,
                    departmentId : filters.departmentId
                },
                paramsSerializer: (params) => qs.stringify(params),
                headers: {
                    'Authorization': `Basic ${btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD"))}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                setAccounts(response.data.content);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.log("Error while retrieving user data: " + error);
            alert("Unable to get user data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/departments/list`, {
                headers: {
                    'Authorization': `Basic ${btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD"))}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                setDepartments(response.data);
            }
        } catch (error) {
            console.log("An error occurred while get department", error);
            alert("Can not get department. Please try again");
        }
    }

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchRoles = async () => {
       try {
            const response = await axios.get(`http://localhost:8080/api/v1/accounts/roles`,{
                headers: {
                    'Authorization': `Basic ${btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD"))}`,
                    'Content-Type': 'application/json',
                }
            })
            if(response.status === 200){
                setRoles(response.data)
            }
       } catch (error) {
            console.log("An error occurred while get roles");
            
       }
    }
    
    useEffect(() => {
        fetchRoles();
    },[])

    // Sử dụng debounce để cập nhật searchTerm
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm); // Cập nhật debouncedSearchTerm sau khi người dùng ngừng gõ
        }, 300); // Đợi 300ms sau khi người dùng ngừng nhập
        return () => clearTimeout(handler); // Dọn dẹp khi searchTerm thay đổi
    }, [searchTerm]);

    // Fetch dữ liệu khi có thay đổi
    useEffect(() => {
        fetchDataAccount(page, sortBy);
    }, [page, sortBy, debouncedSearchTerm, filters]); // Thêm debouncedSearchTerm vào dependency

    // Xử lý phân trang
    const getPaginationItems = () => {
        const paginationItems = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(i);
            }
        } else if (page <= 4) {
            paginationItems.push(1, 2, 3, 4, 5, "...", totalPages);
        } else if (page > totalPages - 4) {
            paginationItems.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            paginationItems.push(1, "...", page - 1, page, page + 1, "...", totalPages);
        }
        return paginationItems;
    };

    // Xử lý chuyển trang
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };
    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

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
            // Thêm ID vào danh sách khi checkbox được chọn
            setSelectedID((prevSelected) => [...prevSelected, id]);
        } else {
            // Loại bỏ ID khỏi danh sách khi checkbox bị bỏ chọn
            setSelectedID((prevSelected) =>
                prevSelected.filter((accountId) => accountId !== id)
            );
        }
    };
    
    const handleModify = () => {
        if (!selectedID) {
            alert("You must select an account to modify");
        } else if (selectedID.length === 1) {
            setDisplay(DISPLAY_MODIFY);
        } else {
            alert("You can only select one account for modification.");
        }
    };
    const formatDate = (date, format = "dd/MM/yyyy") => {
        if (!(date instanceof Date)) {
            date = new Date(date); // Chuyển đổi chuỗi hoặc timestamp thành đối tượng Date
        }
    
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
    
        return format
            .replace("dd", day)
            .replace("MM", month)
            .replace("yyyy", year);
    };
    const deleteAccount = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/accounts`, {
                data: { ids: selectedID },         // Gửi danh sách ID qua body
                headers: {
                    'Authorization': `Basic ${btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD"))}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                alert("Delete account success");
                fetchDataAccount(page, sortBy); // Tải lại dữ liệu sau khi xóa
                setSelectedID([]); // Xóa danh sách ID đã chọn
            }
        } catch (error) {
            console.log("Error deleting account:", error);
            alert("Delete account failed: " + error.message);
        }
        console.log(selectedID);
        
    };
    
    
    const handleDelete = () => {
        if (!selectedID) {  // Kiểm tra nếu selectedID rỗng hoặc không hợp lệ
            alert("You must select an account to remove");
        } else {
            if(window.confirm("Do you want remove this account ?")){
                deleteAccount();
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
                    roles = {roles}
                    page = {page}
                />
            }
            {display === DISPLAY_ADD &&
                <AccountAdd
                    handleChangeDisplay={handleChangeDisplay}
                    refreshAccounts={fetchDataAccount}
                    sortBy={sortBy}
                    departments={departments}
                    roles = {roles}
                />
            }
            <div className="department-filter">
                <div className="filter-type">
                    <div className="filter-title">Department</div>
                    <select name="departmentId" id="type" className="filter-select" onChange={handleChangeFilter}>
                        <option value="">All</option>
                        {departments.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-type">
                    <div className="filter-title">Type</div>
                    <select name="role" id="type" className="filter-select" onChange={handleChangeFilter}>
                        <option value="">All</option>
                        {roles.length > 0 ? 
                            roles.map((item) => (
                                <option value={item.roleValue}>{item.roleName}</option>

                            ))
                        : ""}                                             
                    </select>
                </div>
            </div>
            <div className="account-feature">
                <div className="feature-search">
                    <input
                        className="search-text"
                        type="text"
                        placeholder="Enter username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm
                    />
                </div>
                <div className="feature-crud">
                    <button className="feature-create" onClick={() => {setDisplay(DISPLAY_ADD)}}>
                        <FontAwesomeIcon icon={faPlus} /> Add
                    </button>
                    <button className="feature-update" onClick={handleModify}>
                        <FontAwesomeIcon icon={faPenToSquare} /> Modify
                    </button>
                    <button className="feature-delete" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                    </button>
                </div>
                <select
                    className="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)} // Cập nhật sortBy
                >
                    <option value="fullName,asc">Name A-Z</option>
                    <option value="fullName,desc">Name Z-A</option>
                    <option value="department,asc">Department A-Z</option>
                    <option value="department,desc">Department Z-A</option>
                </select>
            </div>
            <div className="account-data">
                <table className="table">
                    <thead className="thead">
                        <tr className="table-rows">
                            <th className="table-header"></th>
                            <th className="table-header">Username</th>
                            <th className="table-header">Full Name</th>
                            <th className="table-header">Role</th>
                            <th className="table-header">Department</th>
                            <th className="table-header">Create Date</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {loading ? (
                            <tr><td colSpan="5">Đang tải dữ liệu...</td></tr>
                        ) : accounts.length === 0 ? (
                            <tr><td colSpan="5">Không có kết quả nào.</td></tr>
                        ) : (
                            accounts.map((account) => (
                                <tr className="table-rows" key={account.id}>
                                    <td className="table-data">
                                        <input
                                            type="checkbox"
                                            className="table-data"
                                            checked={selectedID.includes(account.id)}  // Kiểm tra nếu tài khoản đã được chọn
                                            onChange={(e) => handleCheckboxChange(account.id,e.target.checked)}  // Thêm logic để chọn/bỏ chọn
                                        />
                                    </td>
                                    <td className="table-data">{account.username}</td>
                                    <td className="table-data">{account.fullName}</td>
                                    <td className="table-data">{account.role}</td>
                                    <td className="table-data">{account.departmentName}</td>
                                    <td className="table-data">{formatDate(account.createDate)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div id="app" className="container">
                <ul className="page">
                    <li className="page__btn" onClick={handlePreviousPage}>Sau</li>
                    {getPaginationItems().map((item, index) => (
                        <li
                            key={index}
                            className={page === item ? "page__numbers active" : "page__numbers"}
                            onClick={() => typeof item === 'number' && setPage(item)}
                        >
                            {item}
                        </li>
                    ))}
                    <li className="page__btn" onClick={handleNextPage}>Tiếp</li>
                </ul>
            </div>
        </div>
    );
};

export default Account;
