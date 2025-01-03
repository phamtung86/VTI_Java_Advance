import '../assets/styles/user/login.css';
import vti_video from "../assets/image/VTI_Video.mp4";
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate, Link } from 'react-router-dom';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !oldPassword || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields!');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/accounts/update-password/username/${username}`, {
                username: username,
                oldPassword: oldPassword,
                password: password,
            });

            if (response.status === 200) {
                alert('Password changed successfully! Please log in again.');
                localStorage.clear();
                setErrorMessage('');
                setTimeout(() => navigate('/login'), 1000);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setErrorMessage(error.response?.data?.message || 'Password change failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="container-left">
                <video className="video-brackground" src={vti_video} autoPlay muted loop></video>
                <div className="container-right">
                    <div className="logo">
                        <img src="https://tuyendung.vti.com.vn/home/images/login/Login%20Logo.png" alt="logo" className="image__logo" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <p className="login-title">Change Password</p>
                        <div className="form-value">
                            <div className="inputbox">
                                <label className="lb-content" htmlFor="username">Username</label><br />
                                <input
                                    className="ip-cen"
                                    type="text"
                                    id="username"
                                    name="username"
                                    required
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="inputbox">
                                <label className="lb-content" htmlFor="oldPassword">Old Password</label><br />
                                <input
                                    className="ip-cen"
                                    type="password"
                                    id="oldPassword"
                                    name="oldPassword"
                                    required
                                    placeholder="Enter your old password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className="inputbox">
                                <label className="lb-content" htmlFor="password">New Password</label><br />
                                <input
                                    className="ip-cen"
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="inputbox">
                                <label className="lb-content" htmlFor="confirmPassword">Confirm Password</label><br />
                                <input
                                    className="ip-cen"
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            {successMessage && <p className="success-message">{successMessage}</p>}
                            <button className="btn-submit" type="submit">
                                Confirm
                            </button>
                            <hr />
                            <button className="btn-back-login" type="button">
                                <Link className="btn-back-login-click" to="/login">Login</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
