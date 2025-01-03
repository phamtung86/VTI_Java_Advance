import '../assets/styles/user/login.css';
import vti_video from "../assets/image/VTI_Video.mp4";
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [account, setAccount] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChangeValueAccount = (e) => {
        const { name, value } = e.target;
        setAccount({
            ...account,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!account.username) {
            newErrors.username = "Username cannot be blank.";
        } else if (account.username.length < 8 || account.username.length > 20) {
            newErrors.username = "Username must be between 8 and 20 characters.";
        }

        if (!account.firstName) {
            newErrors.firstName = "First name cannot be left blank.";
        } else if (account.firstName.length > 50) {
            newErrors.firstName = "First name cannot be longer than 50 characters.";
        }

        if (!account.lastName) {
            newErrors.lastName = "Last name cannot be left blank.";
        } else if (account.lastName.length > 50) {
            newErrors.lastName = "Last name cannot be longer than 50 characters.";
        }

        if (!account.email) {
            newErrors.email = "Email cannot be blank.";
        } else if (!/\S+@\S+\.\S+/.test(account.email)) {
            newErrors.email = "Invalid email.";
        }

        if (!account.password) {
            newErrors.password = "Password cannot be blank.";
        } else if (account.password.length < 8) {
            newErrors.password = "Password must be greater than 8 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(`http://localhost:8080/api/v1/accounts/register`,
                    {
                        username: account.username,
                        firstName: account.firstName,
                        lastName: account.lastName,
                        email: account.email,
                        password: account.password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                if (response.status === 200) {
                    alert("Register account success!");
                    navigate("/login");
                }
            } catch (error) {
                if (error.response && error.response.data.message) {
                    alert(`Register account error: ${error.response.data.message}`);
                } else {
                    alert("Failed, Try again");
                }
            }
        }

    };
    return (
        <div className="login-container">
            <div className="container-left">
                <video className="video-brackground" src={vti_video} autoPlay muted loop></video>
                <div className="container-right">
                    <div className="logo-register">
                        <img
                            src="https://tuyendung.vti.com.vn/home/images/login/Login%20Logo.png"
                            alt="logo"
                            className="image__logo-register"
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <p className="login-title">Register</p>
                        <div className="form-value">
                            {["username", "firstName", "lastName", "email", "password"].map((field) => (
                                <div className="inputbox" key={field}>
                                    <label className="lb-content" htmlFor={field}>
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <br />
                                    <input
                                        className="ip-cen"
                                        type={field === "password" ? "password" : "text"}
                                        id={field}
                                        name={field}
                                        required
                                        placeholder={`Enter ${field}`}
                                        value={account[field]}
                                        onChange={handleChangeValueAccount}
                                    />
                                    {errors[field] && (
                                        <span className="error-message">{errors[field]}</span>
                                    )}
                                </div>
                            ))}
                            <button className="btn-submit" type="submit">
                                Confirm
                            </button>
                            <hr />
                            <button className="btn-back-login" type="button">
                                <Link className="btn-back-login-click" to={"/login"}>
                                    Login
                                </Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;