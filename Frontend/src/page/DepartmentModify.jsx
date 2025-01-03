import { useEffect, useState } from "react";
import "../assets/styles/user/departmentadd.css";
import axios from "axios";

const DepartmentModify = ({ setDisplayStatus, refreshDepartmentList, departmentId, page, sortBy, types }) => {
    const DISPLAY_NONE = 0;
    const [department, setDepartment] = useState({
        id: departmentId,
        name: "",
        type: ""
    });

    // Lấy thông tin phòng ban từ API
    const fetchDepartmentById = async (departmentID) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/departments/${departmentID}`, {
                headers: {
                    'Authorization': `Basic ${btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD"))}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                console.log(response.data);
                setDepartment(response.data);
            } else {
                alert("Unable to get department information.");
            }
        } catch (error) {
            console.error("Error when retrieving department information:", error);

            // Kiểm tra lỗi và hiển thị thông báo phù hợp
            if (error.response) {
                // Lỗi từ server
                if (error.response.status === 401) {
                    alert("You are not logged in or your session has expired.");
                } else if (error.response.status === 403) {
                    alert("You do not have access to department information.");
                } else {
                    alert(`Error: ${error.response.status}. Please try again.`);
                }
            } else {
                alert("An error occurred while retrieving department information. Please try again.");
            }
        }
    };


    // Gọi API lấy dữ liệu khi component được mount
    useEffect(() => {
        fetchDepartmentById(departmentId);
    }, [departmentId]);

    // Đóng form
    const handleCancel = () => {
        if (setDisplayStatus) {
            setDisplayStatus(DISPLAY_NONE);
        }
    };

    // Đặt lại giá trị tên phòng ban về dữ liệu ban đầu
    const handleReset = () => {
        fetchDepartmentById(departmentId);
    };

    // ham sua phong ban
    const updateDepartment = async (e) => {
        e.preventDefault();

        if (!department.name.trim()) {
            alert("Department name cannot be blank!");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/departments/${department.id}`, {
                id: department.id,
                type: department.type,
            }, {
                headers: {
                    'Authorization': `Basic ${btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD"))}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                alert("Successful department update!");
                refreshDepartmentList(page, sortBy);
                setDisplayStatus(DISPLAY_NONE);
            } else {
                alert("Modify failed department.");
            }
        } catch (error) {
            console.error("Error when editing department:", error);

            // Kiểm tra lỗi từ server
            if (error.response) {
                if (error.response.status === 401) {
                    alert("You do not have permission to perform this action!");
                } else if (error.response.status === 400) {
                    alert("Invalid data. Please check again!");
                } else {
                    alert("An error occurred while creating the department. Please try again!");
                }
            } else {
                alert("An error occurred while editing the department. Please try again.");
            }
        }
    };



    const handleChangeValueDepartment = (e) => {
        const { name, value } = e.target;
        setDepartment({
            ...department,
            [name]: value
        })
    }

    return (
        <div className="department-crud">
            <form className="department-crud-form" onSubmit={updateDepartment}>
                <h1 className="department-crud-title">Update Department</h1>
                <div className="form-element">
                    <label className="crud-label crud-label-v2">Mã phòng ban</label>
                    <input
                        className="crud-value-text"
                        value={departmentId}
                        disabled
                    />
                </div>
                <div className="form-element">
                    <label className="crud-label crud-label-v2">Tên phòng ban</label>
                    <input
                        className="crud-value-text"
                        value={department.name}
                        name="name"
                        onChange={handleChangeValueDepartment}
                        placeholder="Tên phòng ban..."
                        disabled
                    />
                </div>
                <div className="form-element">
                    <label className="crud-label crud-label-v2">Type</label>
                    <select
                        className="crud-value-text"
                        value={department.type}
                        name="type"
                        onChange={handleChangeValueDepartment}

                    >
                        {types.length > 0 ?
                            types.map((item) => (
                                <option value={item.typeValue}>{item.typeName}</option>
                            ))
                            : ""
                        }
                    </select>
                </div>


                <div className="crud-button">
                    <button
                        className="crud-button-reset"
                        type="button"
                        onClick={handleReset}
                    >
                        Đặt lại
                    </button>
                    <button
                        className="crud-button-cancel"
                        type="button"
                        onClick={handleCancel}
                    >
                        Hủy
                    </button>
                    <button className="crud-button-submit" type="submit">
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DepartmentModify;
