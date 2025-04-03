import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import vti_video from "../assets/image/VTI_Video.mp4";
import '../assets/styles/user/login.css';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import VideoBackground from '../components/VideoBackground';
import { isPasswordStrong } from '../utils/passwordValidation';
import AccountApi from '../api/AccountApi';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!username || !oldPassword || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields!');
            setLoading(false);
            return;
        }

        if (!isPasswordStrong(password)) {
            setErrorMessage('Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            setLoading(false);
            return;
        }

        try {
            const response = await AccountApi.updatePassword(username, {
                username,
                oldPassword,
                password,
            });

            if (response.status === 200) {
                alert('Password changed successfully! Redirecting to login...');
                localStorage.clear();
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setErrorMessage(error.response?.data?.message || 'Password change failed. Please try again.');
        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="container-left">
                <VideoBackground src={vti_video} />
                <FormWrapper title="Change Password">
                    <InputField
                        id="username"
                        name="username"
                        label="Username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputField
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        label="Old Password"
                        placeholder="Enter your old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <InputField
                        id="password"
                        name="password"
                        type="password"
                        label="New Password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className="btn-submit" type="submit" onClick={handleSubmit}>
                        {loading ? (
                            <div className="spinner"></div> // Hiệu ứng spin
                        ) : (
                            'Confirm'
                        )}
                    </button>
                    <hr />
                    <button className="btn-back-login" type="button">
                        <Link className="btn-back-login-click" to="/login">Login</Link>
                    </button>
                </FormWrapper>
            </div>
        </div>
    );
};

export default ChangePassword;
