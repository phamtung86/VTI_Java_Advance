const AccountTable = ({ accounts, selectedID, handleCheckboxChange, loading }) => {

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
    return (
        <div className="account-data">
        <table className="table">
            <thead className="thead">
                <tr className="table-rows">
                    <th className="table-header"></th>
                    <th className="table-header">Username</th>
                    <th className="table-header">Full Name</th>
                    <th className="table-header">Role</th>
                    <th className="table-header">Group</th>
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
                                    onChange={(e) => handleCheckboxChange(account.id, e.target.checked)}  
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
    )
}
export default AccountTable;