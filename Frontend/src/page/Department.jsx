import { faPenToSquare, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import dayjs from 'dayjs';
import qs from 'qs';
import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import "../assets/styles/user/department.css";
import DepartmentAdd from "./DepartmentAdd";
import DepartmentModify from "./DepartmentModify";
import utc from 'dayjs/plugin/utc';

const Department = () => {
    dayjs.extend(utc); // Kích hoạt plugin utc

    const DISPLAY_NONE = 0;
    const DISPLAY_ADD = 1;
    const DISPLAY_MODIFY = 2;
    const [dataDepartments, setDataDepartments] = useState([]);
    const [departmentId, setDepartmentId] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusDisplay, setStatusDisplay] = useState(DISPLAY_NONE);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("totalMember,desc");
    const [filters, setFilters] = useState({
        minId: null,
        maxId: null,
        minTotalMember: null,
        maxTotalMember: null,
        minCreateDate: null,
        maxCreateDate: null,
        minYear: null,
        maxYear: null,
        minAccount: null,
        maxAccount: null,
        type: null
    });
    const [loading, setLoading] = useState(false);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);  // Debounce tìm kiếm sau 500ms
    const [types, setTypes] = useState([])
    const updateFilter = (field, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value,
        }));
    };

    const role = localStorage.getItem("ROLE");

    const fetchDataListDepartmentWithPaging = async (pageNumber, sortBy, searchTerm, filters) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/departments', {
                params: {
                    pageNumber,
                    size: 10,
                    sort: sortBy,
                    name: searchTerm,
                    ...filters
                },
                paramsSerializer: (params) => qs.stringify(params),
                headers: {
                    'Authorization': `Basic ${btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD"))}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.data && response.data.content) {
                setDataDepartments(response.data.content);
                setTotalPages(response.data.totalPages);
            } else {
                console.error("Invalid data:", response.data);
                alert("Can not get departments. Please try again");
            }
        } catch (error) {
            console.error("An error occurred while get departments", error);
            alert("Unable to get department data, please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const fetchTypes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/departments/types`, {
                headers: {
                    'Authorization': `Basic ${btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD"))}`,
                    'Content-Type': 'application/json',
                }
            })
            if (response.status === 200) {
                setTypes(response.data)
            }
        } catch (error) {
            console.log("An error occurred while get types");

        }
    }
    useEffect(() => {
        fetchTypes();
    }, [])

    useEffect(() => {
        if (role !== "ADMIN") {
            alert("You need to log in with administrator rights to view departments.");
            return;
        } else {
            fetchDataListDepartmentWithPaging(page, sortBy, debouncedSearchTerm, filters);
        }
    }, [page, sortBy, debouncedSearchTerm, filters]);

    const handleSortChange = (e) => {
        const newSortBy = e.target.value;
        setSortBy(newSortBy);
        fetchDataListDepartmentWithPaging(page, newSortBy, debouncedSearchTerm, filters);
    };

    const handleChangeSelectDepartmentId = (e) => setDepartmentId(e.target.value);

    const deleteDepartment = async (departmentId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/departments/id/${departmentId}`, {
                headers: {
                    'Authorization': `Basic ${btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD"))}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                alert("Deleted successfully!");
                fetchDataListDepartmentWithPaging(page, sortBy, debouncedSearchTerm, filters);
            } else {
                alert("Delete failed!");
            }
        } catch (error) {
            console.error("Error when deleting department: ", error);
            alert("Department deletion failed, please try again later.");
        }
    }

    const handleDeleteDepartment = async () => {
        if (!departmentId) {
            alert("You have not selected a department to delete.");
            return;
        } else {
            if (window.confirm("Are you sure you want to delete?")) {
                deleteDepartment(departmentId);
            }
        }
    };

    const handleChangeDisplay = (value) => setStatusDisplay(value);

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

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleChangeFilter = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const formattedDate = (date) => {
        return dayjs.utc(date).format('DD/MM/YYYY');
    }

    return (
        <>
            {statusDisplay === DISPLAY_ADD && (
                <DepartmentAdd
                    setDisplayStatus={handleChangeDisplay}
                    page={page}
                    sortBy={sortBy}
                    types={types}
                    refreshDepartmentList={() => fetchDataListDepartmentWithPaging(page, sortBy, debouncedSearchTerm, filters)}
                />
            )}
            {statusDisplay === DISPLAY_MODIFY && (
                <DepartmentModify
                    setDisplayStatus={handleChangeDisplay}
                    page={page}
                    sortBy={sortBy}
                    refreshDepartmentList={() => fetchDataListDepartmentWithPaging(page, sortBy, debouncedSearchTerm, filters)}
                    departmentId={departmentId}
                    types={types}
                />
            )}
            <div className="department">
                <h1 className="department-title">Department List</h1>
                <div className="department-filter">
                    <div className="filter-date">
                        <div className="filter-title">Min date</div>
                        <div className="filter-value">
                            <input
                                className="value-input"
                                type="date"
                                value={filters.minCreateDate}
                                name="minCreateDate"
                                onChange={handleChangeFilter}
                            />
                        </div>
                    </div>
                    <div className="filter-date">
                        <div className="filter-title">Max date</div>
                        <div className="filter-value">
                            <input
                                className="value-input"
                                type="date"
                                value={filters.maxCreateDate}
                                name="maxCreateDate"
                                onChange={handleChangeFilter}
                            />
                        </div>
                    </div>
                    <div className="filter-type">
                        <div className="filter-title">Type</div>
                        <select name="type" id="type" className="filter-select" onChange={handleChangeFilter}>
                            <option value="">All</option>
                            {types.length > 0 ?
                                types.map((item) => (
                                    <option value={item.typeValue}>{item.typeName}</option>
                                ))
                                : ""
                            }
                        </select>
                    </div>
                </div>
                <div className="department-feature">
                    <div className="feature-search">
                        <input
                            className="search-text"
                            type="text"
                            placeholder="Enter department name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className="search-button"
                            onClick={() => fetchDataListDepartmentWithPaging(page, sortBy, debouncedSearchTerm, filters)}
                        >
                            Search
                        </button>
                    </div>
                    <div className="feature-crud">
                        <button
                            className="feature-create"
                            onClick={() => handleChangeDisplay(DISPLAY_ADD)}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Add
                        </button>
                        <button
                            className="feature-update"
                            onClick={() =>
                                departmentId
                                    ? handleChangeDisplay(DISPLAY_MODIFY)
                                    : alert("Bạn chưa chọn phòng ban để sửa")
                            }
                        >
                            <FontAwesomeIcon icon={faPenToSquare} /> Modify
                        </button>
                        <button
                            className="feature-delete"
                            onClick={handleDeleteDepartment}
                        >
                            <FontAwesomeIcon icon={faTrashCan} /> Delete
                        </button>
                    </div>
                    <select
                        className="sort-by"
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        <option value="name,asc">Name A-Z</option>
                        <option value="name,desc">Name Z-A</option>
                        <option value="totalMember,desc">Total Member descending</option>
                        <option value="totalMember,asc">Total Member ascending</option>
                        <option value="createdDate,desc">Create Date descending</option>
                        <option value="createdDate,asc">Create Date ascending</option>
                    </select>
                </div>
                <div className="department-data">
                    <table className="table">
                        <thead className="thead">
                            <tr className="table-rows">
                                <th className="table-header"></th>
                                <th className="table-header">Name</th>
                                <th className="table-header">Total Member</th>
                                <th className="table-header">Type</th>
                                <th className="table-header">Create</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {loading ? (
                                <tr><td colSpan="5">Loading...</td></tr>
                            ) : dataDepartments.length === 0 ? (
                                <tr><td colSpan="5">No departments found</td></tr>
                            ) : (
                                dataDepartments.map((department) => (
                                    <tr className="table-rows" key={department.id}>
                                        <td className="table-data">
                                            <input
                                                type="radio"
                                                className="table-data"
                                                value={department.id}
                                                name="departmentSelect"
                                                onChange={handleChangeSelectDepartmentId}
                                            />
                                        </td>
                                        <td className="table-data">{department.name}</td>
                                        <td className="table-data">{department.totalMember}</td>
                                        <td className="table-data">{department.type}</td>
                                        <td className="table-data">{formattedDate(department.createdDate)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="app" className="container">
                <ul className="page">
                    <li className="page__btn" onClick={handlePreviousPage}>Pre</li>
                    {getPaginationItems().map((item, index) => (
                        <li
                            key={index}
                            className={page === item ? "page__numbers active" : "page__numbers"}
                            onClick={() => typeof item === 'number' && setPage(item)}
                        >
                            {item}
                        </li>
                    ))}
                    <li className="page__btn" onClick={handleNextPage}>Next</li>
                </ul>
            </div>
        </>
    );
};

export default Department;
