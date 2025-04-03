import React from 'react';

const InputField = ({ id, name, type = "text", label, value, onChange, placeholder, error }) => {
    return (
        <div className="inputbox">
            <label className="lb-content" htmlFor={id}>{label}</label><br />
            <input
                className="ip-cen"
                type={type}
                id={id}
                name={name}
                required
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default InputField;