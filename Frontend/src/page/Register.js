import '../assets/styles/user/login.css';
import vti_video from "../assets/image/VTI_Video.mp4";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import VideoBackground from '../components/VideoBackground';
import FormWrapper from '../components/FormWrapper';
import { isPasswordStrong } from '../utils/passwordValidation';
import AccountApi from '../api/AccountApi';

const Register = () => {
    const [account, setAccount] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
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
            newErrors.password = "Password must be greater than 8 characters.";
        } else if (!isPasswordStrong(account.password)) {
            newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        }
        if (account.password !== account.confirmPassword) {
            newErrors.confirmPassword = "Confirm password not match"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true); // Bật hiệu ứng spin
            try {
                const response = await AccountApi.register(account);
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
            } finally {
                setLoading(false); // Tắt hiệu ứng spin sau khi nhận phản hồi từ API
            }
        }
    };

    return (
        <div className="login-container">
            <div className="container-left">
                <VideoBackground src={vti_video} />
                <FormWrapper title="Register">
                    {["username", "firstName", "lastName", "email", "password", "confirmPassword"].map((field) => (
                        <InputField
                            key={field}
                            id={field}
                            name={field}
                            type={field === "password" || field === "confirmPassword" ? "password" : "text"}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            placeholder={`Enter ${field}`}
                            value={account[field]}
                            onChange={handleChangeValueAccount}
                            error={errors[field]}
                        />
                    ))}
                    <button className="btn-submit" type="submit" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <div className="spinner"></div> // Hiệu ứng spin
                        ) : (
                            'Confirm'
                        )}
                    </button>
                    <hr />
                    <button className="btn-back-login" type="button">
                        <Link className="btn-back-login-click" to={"/login"}>
                            Login
                        </Link>
                    </button>
                </FormWrapper>
            </div>
        </div>
    );
};

export default Register;
