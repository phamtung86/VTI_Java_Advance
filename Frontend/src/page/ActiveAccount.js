import { useLocation, useNavigate } from "react-router-dom";
import '../assets/styles/activeaccount.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import AccountApi from "../api/AccountApi";
const ActiveAccount = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = new URLSearchParams(location.search).get('token');
    const activeAccount = async () => {
        try {
            const response = await AccountApi.activeAcount(token);
            if (response.status === 200) {
                alert('Account activated successfully! Please log in again.');
                navigate('/login');
            }
        } catch (error) {
            alert('Invalid or expired token!');
        }
    }

    return (
        <div className="active-account">
             <img className="logo-active" src="https://tuyendung.vti.com.vn/home/images/intro/Logo.png" alt="VTI" />
            <h1 className="active_account-title">Active Account</h1>
            <FontAwesomeIcon className="icon-contruction-active" icon={faHandPointDown} beat />
            <button className="button-active-account" onClick={activeAccount} title="click here to active account">Active Account</button>
        </div>
    )
}

export default ActiveAccount;