import { useEffect, useState } from "react";

const HomePage = () => {
    const [role, setRole] = useState(localStorage.getItem("ROLE"));
    const fullName = localStorage.getItem("FULL_NAME")
    useEffect(() => {
        if (role === "EMPLOYEE" || role === "MANAGER" || role === "ADMIN") {
        } else {
            window.location.href = "/login";
        }
    }, [role]);
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