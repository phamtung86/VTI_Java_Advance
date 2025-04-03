import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const HomePage = () => {
    const { currentUser } = useContext(AuthContext);
    const fullName = currentUser ? currentUser.fullName : null;

    return (
        <div className="home-page">
            <h1 className="home-page-title">Home Page</h1>
            <p className="home-page-content">
                {fullName ? fullName : ""}
            </p>
        </div>
    )
}
export default HomePage