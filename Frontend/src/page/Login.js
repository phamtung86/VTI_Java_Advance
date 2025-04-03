import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../api/login';
import vti_video from "../assets/image/VTI_Video.mp4";
import '../assets/styles/user/login.css';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import VideoBackground from '../components/VideoBackground';
import { AuthContext } from '../contexts/AuthContext';
import AccountApi from '../api/AccountApi';

const DISPLAY_RESET_PASSWORD = 2;
const DISPLAY_LOGIN = 1;
const Login = () => {
    const [account, setAccount] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const [displayStatus, setDisplayStatus] = useState(DISPLAY_LOGIN);
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleChangeValueAccount = (e) => {
        const { name, value } = e.target;
        setAccount({
            ...account,
            [name]: value,
        });
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const callLoginAPI = async (username, password) => {
        try {
            const response = await Auth.login(username, password);

            if (response.status === 200) {
                login(response.data.user, response.data.token);
                    
                if (rememberMe) {
                    localStorage.setItem("token", response.data.token);
                } else {
                    sessionStorage.setItem("token", response.data.token);
                }

                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 401) {
                    alert(data.message || "Account not active, please check your email to activate account!");
                } else if (status === 404) {
                    alert(data.message || "Login failed, please check your account and password again!");
                } else {
                    alert("Login failed, please try again later!");
                }
            } else {
                console.error("Unknown Error:", error);
                alert("An unexpected error occurred!");
            }
        }
    };

    const resetPassword = async (email) => {
        setLoading(true)
        if (!email) {
            alert("Email cannot be blank.");
            setLoading(false)
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Invalid email.");
            setLoading(false)
            return;
        }
        try {
            const response = await AccountApi.resetPassword(email);
            if (response.status === 200) {
                alert("Password reset email sent!");
                setDisplayStatus(DISPLAY_LOGIN);
            }
        } catch (error) {
            alert("Failed to send reset password email.");
        } finally{
            setLoading(false)
        }
    };

    return (
        <div className="login-container">
            <div className="container-left">
                <VideoBackground src={vti_video} />
                {displayStatus === 1 && (
                    <FormWrapper title="Login">
                        <InputField
                            id="username"
                            name="username"
                            label="Username"
                            placeholder="Enter your username"
                            value={account.username}
                            onChange={handleChangeValueAccount}
                        />
                        <InputField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={account.password}
                            onChange={handleChangeValueAccount}
                        />
                        <div className="inputcheck">
                            <div className="input-remember">
                                <input
                                    className="ip-box"
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <Link className="ip-link" to="#" onClick={() => setDisplayStatus(DISPLAY_RESET_PASSWORD)}>
                                Forgot password?
                            </Link>
                        </div>
                        <button className="btn-submit" type="button" onClick={() => callLoginAPI(account.username, account.password)}>
                            Login
                        </button>
                        <p className="btn-signin">
                            Do you have an account? <Link className="register-click" to={"/register"}>Register</Link>
                        </p>
                    </FormWrapper>
                )}
                {displayStatus === 2 && (
                    <FormWrapper title="Reset Password">
                        <InputField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            value={account.email}
                            onChange={handleChangeValueAccount}
                        />
                        <div className="reset-password-button">
                            <button className="btn-back" type="button" onClick={() => setDisplayStatus(DISPLAY_LOGIN)}>
                                Back
                            </button>
                            <button className="btn-submit-reset" type="button" onClick={() => resetPassword(account.email)}>

                                {loading ? (
                                    <div className="spinner"></div> // Hiệu ứng spin
                                ) : (
                                    'Confirm'
                                )}
                            </button>
                        </div>
                    </FormWrapper>
                )}
            </div>
        </div>
    );
};

export default Login;
