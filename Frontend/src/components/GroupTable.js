import React from "react";
import dayjs from "dayjs";

const GroupTable = ({ dataDepartments, loading, handleChangeSelectDepartmentId }) => {
    const formattedDate = (date) => dayjs.utc(date).format("DD/MM/YYYY");

    return (
        <div className="department-data">
            <table className="table">
                <thead className="thead">
                    <tr className="table-rows">
                        <th className="table-header"></th>
                        <th className="table-header">Name</th>
                        <th className="table-header">Total Member</th>
                        <th className="table-header">Create</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {loading ? (
                        <tr><td colSpan="5">Loading...</td></tr>
                    ) : dataDepartments.length === 0 ? (
                        <tr><td colSpan="5">No groups found</td></tr>
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
                                <td className="table-data">{formattedDate(department.createdDate)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default GroupTable;