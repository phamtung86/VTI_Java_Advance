import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DISPLAY_ACCOUNT_LIST = 1;
const GroupForm = ({
    department,
    handleChange,
    handleSubmit,
    handleCancel,
    handleReset,
    formTitle,
    handleTypeAction,
    removeAccount,
    handleOpenAccountList
}) => {

    return (
        <>
            <form className="department-crud-form" onSubmit={handleSubmit}>
                <h1 className="department-crud-title">{formTitle}</h1>
                {handleTypeAction !== "ADD" && (
                    <div className="form-element">
                        <label className="crud-label crud-label-v2">Group ID</label>
                        <input
                            className="crud-value-text"
                            value={department.id}
                            disabled
                        />
                    </div>
                )}

                <div className="form-element">
                    <label className="crud-label crud-label-v2">Group Name</label>
                    <input
                        className="crud-value-text"
                        value={department.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Group name..."

                    />
                </div>

                {handleTypeAction === "ADD" && department.accounts.length > 0 && (
                    <>
                        <div className="account-list-table">
                            <h3>Accout</h3>
                            <div className="table-header-account-list">
                                <div className="table-header-data-account-list"></div>
                                <div className="table-header-data-account-list">Username</div>
                                <div className="table-header-data-account-list">Full Name</div>
                                <div className="table-header-data-account-list">Role</div>
                            </div>
                            <div className="table-body-account-list">
                                {department.accounts.map((item) => (
                                    <div className="table-rows-account-list" key={item.id}>
                                        <div className="table-data-account-list">
                                            <button type="button" onClick={() => removeAccount(item.id)} className="button-delete">
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </div>
                                        <div className="table-data-account-list">{item.username}</div>
                                        <div className="table-data-account-list">{item.firstName + " " + item.lastName}</div>
                                        <div className="table-data-account-list">{item.role}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {
                    handleTypeAction === "ADD" && (
                        <button
                            className="button-add-account"
                            type="button"
                            onClick={() => handleOpenAccountList(DISPLAY_ACCOUNT_LIST)}
                        >
                            Add account
                        </button>

                    )
                }

                <div className="crud-button">
                    <button
                        className="crud-button-reset"
                        type="button"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        className="crud-button-cancel"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button className="crud-button-submit" type="submit">
                        Confirm
                    </button>
                </div>
            </form>
        </>
    );
};

export default GroupForm;