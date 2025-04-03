import React from "react";

const GroupFilter = ({ filters, handleChangeFilter }) => {
    return (
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
        </div>
    );
};

export default GroupFilter;