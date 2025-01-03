import '../assets/styles/user/login.css';
import vti_video from "../assets/image/VTI_Video.mp4";
import { useState } from 'react';
import axios from 'axios'; // Import Axios
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [account, setAccount] = useState({
        username: "",
        password: "",
        email: "",
    });
    const navigate = useNavigate();
    const handleChangeValueAccount = (e) => {
        const { name, value } = e.target;
        setAccount({
            ...account,
            [name]: value
        });
    };
    const DISPLAY_LOGIN = 1;
    const DISPLAY_RESET_PASSWORD = 2;
    const DISPLAY_NONE = 0;
    const [displayStatus, setDisplayStatus] = useState(DISPLAY_LOGIN);

    const callLoginAPI = async (username, password) => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/auth/login', {
                headers: {
                    'Authorization': `Basic ${btoa(username + ":" + password)}`,
                    'Content-Type': 'application/json',
                }
            });

            const isRememberMe = document.getElementById("remember").checked;
            localStorage.setItem("rememberMe", isRememberMe);
            if (response.status === 200) {
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem("ID", response.data.id);
                localStorage.setItem("FULL_NAME", response.data.fullName);
                localStorage.setItem("DEPARTMENT_NAME", response.data.departmentName);
                localStorage.setItem("ROLE", response.data.role);
                localStorage.setItem("USERNAME", username);
                localStorage.setItem("PASSWORD", password);
                navigate("/")
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                showLoginFailMessage();
            } else {
                console.error(error);
            }
        }
    };
    const resetPassword = async (email) => {
        if (!email) {
            alert("Email cannot be blank.");
            return;
        } 
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Invalid email.");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/accounts/resetPassword?email=${email} `);
            if (response.status === 200) {
                alert("Please check your email to reset password!");
            }
        } catch (error) {
            console.log("Error occurred while requesting password reset:", error);
            alert("Error occurred while requesting password reset!");
        }
    };
    

    const handleResetPassword = (e) => {
        e.preventDefault();
        resetPassword(account.email);
    };
    
    // Hàm hiển thị thông báo lỗi đăng nhập
    const showLoginFailMessage = () => {
        alert("Login failed, please check your account and password again!");
    };
    return (
        <div className="login-container">'

            <div className="container-left">
                <video className="video-brackground" src={vti_video} autoPlay muted loop></video>
                {displayStatus === DISPLAY_LOGIN && (
                    <div className="container-right">
                        <div className="logo">
                            <img src="https://tuyendung.vti.com.vn/home/images/login/Login%20Logo.png" alt="logo" className="image__logo" />
                        </div>
                        <form> {/* Sử dụng onSubmit để gọi hàm login */}
                            <p className="login-title">Login</p>
                            <div className="form-value">
                                <div className="inputbox">
                                    <label className="lb-content" htmlFor="username">Username</label><br />
                                    <input
                                        className="ip-cen"
                                        type="text"
                                        id="username"
                                        name="username"
                                        required
                                        placeholder="Username"
                                        value={account.username}
                                        onChange={handleChangeValueAccount}
                                    />
                                </div>
                                <div className="inputbox">
                                    <label className="lb-content" htmlFor="password">Password</label><br />
                                    <div className="password-wrapper">
                                        <input
                                            className="ip-cen"
                                            type="password"
                                            id="password"
                                            name="password"
                                            required
                                            placeholder="Password"
                                            value={account.password}
                                            onChange={handleChangeValueAccount}
                                        />
                                    </div>
                                </div>
                                <div className="inputcheck">
                                    <div className="input-remember">
                                        <input className="ip-box" type="checkbox" id="remember" name="remember" />
                                        <label htmlFor="remember">Remember me</label>
                                    </div>
                                    <Link className="ip-link" href="#" onClick={() => { setDisplayStatus(DISPLAY_RESET_PASSWORD) }}>Forgot password?</Link>
                                </div>
                                <button className="btn-submit" type="button" onClick={() => { callLoginAPI(account.username, account.password) }}>Login</button>
                                <p className="btn-signin">Do you have an account? <Link className="register-click" to={"/register"}>Register</Link></p>
                            </div>
                        </form>
                    </div>)}

                {displayStatus === DISPLAY_RESET_PASSWORD && (
                    <div className="reset-password">
                        <div className="logo">
                            <a href="/" className="logo-link">
                                <img src="https://tuyendung.vti.com.vn/home/images/login/Login%20Logo.png" alt="logo" className="image__logo" />
                            </a>
                        </div>
                        <form onSubmit={handleResetPassword}>
                            <p className="login-title">Enter your email</p>
                            <div className="form-value">
                                <div className="inputbox">
                                    <input 
                                        className="ip-cen" 
                                        type="email" 
                                        id="email" 
                                        name="email" required                            
                                        placeholder="Vd: tungvti@gmail.com"
                                        onChange={handleChangeValueAccount}
                                    />
                                </div>
                                <div className="reset-password-button">
                                    <button className="btn-back" type="button" onClick={() => { setDisplayStatus(DISPLAY_LOGIN) }}>Back</button>
                                    <button className="btn-submit-reset" type="submit">Confirm</button>
                                </div>

                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Login;
