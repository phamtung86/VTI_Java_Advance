import React from 'react';

const FormWrapper = ({ children, title }) => {
    return (
        <div className="container-right">
            <div className="logo">
                <img src="https://tuyendung.vti.com.vn/home/images/login/Login%20Logo.png" alt="logo" className="image__logo" />
            </div>
            <form className="form">
                <p className="login-title">{title}</p>
                <div className="form-value">
                    {children}
                </div>
            </form>
        </div>
    );
};

export default FormWrapper;