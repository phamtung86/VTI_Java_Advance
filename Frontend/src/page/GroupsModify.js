import { useEffect, useState } from "react";
import DepartmentApi from "../api/groupApi";
import "../assets/styles/user/departmentadd.css";
import GroupForm from "../components/GroupForm";
import { fetchDepartmentById, handleError } from "../utils/GroupUtils";

const GroupModify = ({ setDisplayStatus, refreshDepartmentList, departmentId, page, sortBy, types }) => {
    const DISPLAY_NONE = 0;
    const [department, setDepartment] = useState({
        id: departmentId,
        name: "",
    });

    useEffect(() => {
        fetchDepartmentById(departmentId, setDepartment);
    }, [departmentId]);

    const handleCancel = () => {
        if (setDisplayStatus) {
            setDisplayStatus(DISPLAY_NONE);
        }
    };

    const handleReset = () => {
        fetchDepartmentById(departmentId, setDepartment);
    };

    const updateDepartment = async (e) => {
        e.preventDefault();

        if (!department.name.trim()) {
            alert("Group name cannot be blank!");
            return;
        }

        try {
            const response = await DepartmentApi.updateDepartment(
                
                   department.id,
                
                {
                id: department.id,
                name: department.name,
                }
        );

            if (response.status === 200) {
                alert("Successful group update!");
                refreshDepartmentList(page, sortBy);
                setDisplayStatus(DISPLAY_NONE);
            } else {
                alert("Modify failed group.");
            }
        } catch (error) {
            handleError(error, "editing group");
        }
    };

    const handleChangeValueDepartment = (e) => {
        const { name, value } = e.target;
        setDepartment({
            ...department,
            [name]: value
        });
    };

    return (
        <div className="department-crud">
            <GroupForm
                department={department}
                types={types}
                handleChange={handleChangeValueDepartment}
                handleSubmit={updateDepartment}
                handleCancel={handleCancel}
                handleReset={handleReset}
                formTitle="Update Group"
                isEditMode={true}
            />
        </div>

    );
};

export default GroupModify;