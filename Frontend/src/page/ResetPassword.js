import '../assets/styles/user/login.css';
import vti_video from "../assets/image/VTI_Video.mp4";
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import VideoBackground from '../components/VideoBackground';
import FormWrapper from '../components/FormWrapper';
import { isPasswordStrong } from '../utils/passwordValidation';
import AccountApi from '../api/AccountApi';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = new URLSearchParams(location.search).get('token');


    useEffect(() => {
        if (token) {
            AccountApi.validateToken(token)
                .then(response => {
                    if (response.status === 200) {
                        setIsTokenValid(true);
                    } else {
                        navigate('/login');
                        setErrorMessage('Invalid or expired token.');
                    }
                    setIsLoading(false);
                })
                .catch(() => {
                    setErrorMessage('Invalid or expired token.');
                    setIsLoading(false);
                });
        } else {
            setErrorMessage('Token not found!');
            setIsLoading(false);
        }
    }, [token, navigate]);

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

        if (!isPasswordStrong(password)) {
            setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        }

        try {
            const response = await AccountApi.changePassword({ token, newPassword: password });
            if (response.status === 200) {
                alert('Password changed successfully! Please log in again.');
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch {
            setErrorMessage('Password change failed. Please try again.');
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="login-container">
            <div className="container-left">
                <VideoBackground src={vti_video} />
                <FormWrapper title="Change Password">
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
                        Confirm
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

export default ResetPassword;
