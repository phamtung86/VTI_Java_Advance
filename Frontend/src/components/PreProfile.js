import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import '../assets/styles/preprofile.css';

const PreProfile = ({ menuVisible, logOut }) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    return (
        <div className={`feature_logout ${menuVisible ? "show" : ""}`}>
            <div className="pre-profile">
                <img src={currentUser?.profileImage} alt="avatar" className="pre-profile-image" />
                <p className="pre-profile-name">{currentUser?.fullName}</p>
                <button className="logout_button" onClick={logOut}>
                    Log out
                </button>
                <button className="logout_button" onClick={() => navigate("/password")}>
                    Change password
                </button>
                <button className="logout_button" onClick={() => navigate("/profile")}>
                    Edit profile
                </button>
            </div>
        </div>
    );
}
export default PreProfile;