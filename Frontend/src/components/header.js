import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/header.css';
import { AuthContext } from '../contexts/AuthContext';
import PreProfile from './PreProfile';
const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);
    const fullName = currentUser ? currentUser.fullName : null;

    const logOut = () => {
        if (window.confirm("Do you want log out")) {
            localStorage.clear()
            navigate("/login")
        }
    }
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    }


    return (
        <div className='header'>
            <div className='header-logo-feature'>
                <div className='header-logo-slogan'>
                    <img src='https://tuyendung.vti.com.vn/home/images/header/Logo-New.svg' className='header-logo' alt='Logo VTI' />
                    <h2 className='header-slogan'>
                        Way To Enterprise
                    </h2>
                </div>
                <div className='header-menu' >
                    <ul className='menu-feature'>
                        <li className='feature'>
                            <span className="feature-link" onClick={toggleMenu}>
                                {fullName ? fullName : "Tài khoản"}
                            </span>
                        </li>
                        <PreProfile menuVisible={menuVisible} logOut={logOut} />
                    </ul>
                </div>
            </div>
            <div className='header-contact'>
                Contact Us: ・
                Hanoi: <Link className='contact-click' to={"tel: +842473039996"}>(+84) 24-7303-9996</Link> ・
                Ho Chi Minh: <Link className='contact-click' to={"tel: +842473068883"}>(+84) 24-7306-8883</Link> ・
                Japan:<Link className='contact-click' to={"tel: +81362615698"}>(+81) 3-6261-5698</Link> ・
                Korea:<Link className='contact-click' to={"tel: +82220391159"}>(+82) 2-2039-1159</Link>
            </div>
        </div>
    )
}
export default Header;