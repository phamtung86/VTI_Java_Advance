import { Link } from "react-router-dom";
import '../assets/styles/user/home.css';
import { useState } from "react";
import Department from "./Department";
import Account from "./Account";
// import Dashboard from "./Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faNewspaper, faPeopleGroup, faPeopleRoof, faUser } from "@fortawesome/free-solid-svg-icons";
import HomePage from "./HomePage";

const Home = () => {
    const DISPLAY_HOME = 1;
    const DISPLAY_DEPARTMENT = 2;
    const DISPLAY_USER = 3;
    const [display, setDisplay] = useState(DISPLAY_HOME);
    const role = localStorage.getItem("ROLE");

    return (
        <div className="home">
            <div className='side-bar'>
                <img className="home-logo-image" src="https://tuyendung.vti.com.vn/home/images/intro/Logo.png" alt="VTI"/>
                <ul className='side-bar-menu'>
                    <li className={(display === DISPLAY_HOME) ? 'menu-item-checked' : 'menu-item'} onClick={() => {setDisplay(DISPLAY_HOME)}}>
                        <Link className="item-link" ><FontAwesomeIcon icon={faChartLine} />Home</Link>
                    </li>

                    {role === 'ADMIN' && (
                        <>
                            <li className={(display === DISPLAY_DEPARTMENT) ? 'menu-item-checked' : 'menu-item'} onClick={() => {setDisplay(DISPLAY_DEPARTMENT)}}>
                                <Link className="item-link" ><FontAwesomeIcon icon={faPeopleRoof} />Departments</Link>
                            </li>
                            <li className={(display === DISPLAY_USER) ? 'menu-item-checked' : 'menu-item'} onClick={() => {setDisplay(DISPLAY_USER)}}>
                                <Link className="item-link" ><FontAwesomeIcon icon={faUser} />Users</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className="home-content">
                {display === DISPLAY_HOME && <HomePage />}
                {display === DISPLAY_DEPARTMENT && <Department />}
                {display === DISPLAY_USER && <Account/>}
            </div>
        </div>
    )
}
export default Home;
