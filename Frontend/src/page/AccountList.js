import { useEffect, useState } from 'react';
import AccountApi from '../api/AccountApi';
import '../assets/styles/user/accountList.css';

const AccountList = ({ departmentName, display, dataAccounts }) => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const DISPLAY_NONE = 0;

    const fetchAccounts = async () => {
        try {
            const response = await AccountApi.getAllAccountsNoDepartment()
            if (response.status === 200) {
                setAccounts(response.data);
            }
        } catch (error) {
            console.error("Error when getting group: ", error);
            alert("Error retrieving group. Please try again later.");
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    // Hàm xử lý khi checkbox thay đổi
    const handleCheckboxChange = (id, isChecked) => {
        if (isChecked) {
            // Thêm ID vào danh sách khi checkbox được chọn
            setSelectedAccounts((prevSelected) => [...prevSelected, id]);
        } else {
            // Loại bỏ ID khỏi danh sách khi checkbox bị bỏ chọn
            setSelectedAccounts((prevSelected) =>
                prevSelected.filter((accountId) => accountId !== id)
            );
        }
    };

    const handleChangeDisplay = () => {
        if (display) {
            display(DISPLAY_NONE);
        }
    };

    const fetchAccountsById = async (selectedIds) => {
        try {
            const response = await AccountApi.getListAccountById(selectedIds)
            if (response.status === 200) {
                dataAccounts(response.data);
            }
        } catch (error) {
            console.error("Error while getting user: ", error);
        }
    };

    const setDataAccount = () => {
        fetchAccountsById(selectedAccounts);
        handleChangeDisplay()
    };

    return (
        <div className="account-list">
            <h2 className="account-list-title">
                Add account into {departmentName}
            </h2>
            <div className="account-list-table">
                <div className="table-header-account-list">
                    <div className="table-header-data-account-list"></div>
                    <div className="table-header-data-account-list">Username</div>
                    <div className="table-header-data-account-list">Full Name</div>
                    <div className="table-header-data-account-list">Role</div>
                </div>
                <div className="table-body-account-list">
                    {accounts.map((item) => (
                        <div className="table-rows-account-list" key={item.id}>
                            <div className="table-data-account-list">
                                <input
                                    type="checkbox"
                                    className="table-data-checkbox"
                                    checked={selectedAccounts.includes(item.id)}
                                    onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                />
                            </div>
                            <div className="table-data-account-list">{item.username}</div>
                            <div className="table-data-account-list">{item.firstName + " " + item.lastName}</div>
                            <div className="table-data-account-list">{item.role}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="account-list-button">
                <button className="button-cancel" onClick={handleChangeDisplay}>Cancel</button>
                <button className="button-submit" onClick={setDataAccount} type="button">Confirm</button>
            </div>
        </div>
    );
};

export default AccountList;
