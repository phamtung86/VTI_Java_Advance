import '../assets/styles/user/login.css';
import vti_video from "../assets/image/VTI_Video.mp4";
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate, useLocation, Link } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(false); // State to store token validity
    const [isLoading, setIsLoading] = useState(true); // Loading state while checking token
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    console.log(token);
    
    useEffect(() => {
        if (token) {
            axios.get(`http://localhost:8080/api/v1/accounts/change-password?token=${token}`)
                .then(response => {
                    if (response.status === 200) {
                        setIsTokenValid(true); // Token is valid
                        alert('Token is valid.');
                    } else {
                        alert('Invalid or expired token.');
                        navigate('/login');
                        setErrorMessage('Invalid or expired token.');
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    setErrorMessage('Invalid or expired token.');
                    setIsLoading(false);
                });
        } else {
            setErrorMessage('Token not found!');
            setIsLoading(false);
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isTokenValid) {
            setErrorMessage('Invalid or expired token!');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        if (!password || !confirmPassword) {
            setErrorMessage('Please fill in both password fields!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/accounts/savePassword', {
                token : token,
                newPassword: password,
            });
            if (response.status === 200) {
                alert('Password changed successfully! Please log in again.');
                setErrorMessage('');
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setErrorMessage('Password change failed. Please try again.');
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

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

export default ResetPassword;
