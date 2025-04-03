import { useContext } from "react";
import { Navigate } from "react-router-dom";
import './App.css';
import './assets/styles/global.css';
import Header from './components/header';
import { AuthContext } from "./contexts/AuthContext";
import Home from './page/Home';
function App() {

  const { currentUser } = useContext(AuthContext)
  const token = localStorage.getItem("token") || sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />; // Nếu chưa đăng nhập, chuyển hướng Login
  }
  return (
    <div className="App">
      <Header />
      <Home role={currentUser?.role} />
    </div>
  );
}

export default App;
