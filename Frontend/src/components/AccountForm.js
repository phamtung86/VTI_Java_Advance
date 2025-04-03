import React from 'react';

const AccountForm = ({ account, roles, departments, handleInputChange, handleSubmit, handleCancel, formTitle, isEditMode }) => {
    return (
        <div className="account-crud">
            <form onSubmit={handleSubmit} className="account-crud-form">
                <h1 className="account-crud-title">{formTitle}</h1>
                <div className="crud-label-value">
                    <label htmlFor="username" className="account-crud-label">Username</label>
                    <input
                        className="account-crud-value"
                        value={account.username}
                        name="username"
                        onChange={handleInputChange}
                        disabled={isEditMode}
                    />
                </div>
                <div className="crud-label-value">
                    <label htmlFor="firstName" className="account-crud-label">First Name</label>
                    <input
                        className="account-crud-value"
                        value={account.firstName}
                        name="firstName"
                        onChange={handleInputChange}
                        disabled={isEditMode}
                    />
                </div>
                <div className="crud-label-value">
                    <label htmlFor="lastName" className="account-crud-label">Last Name</label>
                    <input
                        className="account-crud-value"
                        value={account.lastName}
                        name="lastName"
                        onChange={handleInputChange}
                        disabled={isEditMode}
                    />
                </div>
                <div className="crud-label-value">
                    <label htmlFor="role" className="account-crud-label">Role</label>
                    <select name="role" id="role" className="account-crud-value" value={account.role} onChange={handleInputChange}>
                        {roles.length > 0 ? 
                            roles.map((item) => (
                                <option key={item.value} value={item.value}>{item.name}</option>
                            ))
                        : ""}       
                    </select>
                </div>
                <div className="crud-label-value">
                    <label htmlFor="department" className="account-crud-label">Group</label>
                    <select name="departmentId" id="department" className="account-crud-value" value={account.departmentId} onChange={handleInputChange}>
                        <option value="0">Unknown</option>
                        {departments.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="account-crud-actions">
                    <button type="button" className="account-crud-cancel" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="account-crud-submit">{isEditMode ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div>
    );
};

export default AccountForm;