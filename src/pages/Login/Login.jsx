import { useState, useContext } from "react";
import axios from "../../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      login(data.token,data.user.username);
      toast.success("LoggedIn successfully!");
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"} 
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <span
              className="toggle-eye"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEye/>: <FaEyeSlash/>}
            </span>
          </div>
          <button type="submit" className="login-button">Login</button>
          <Link to='/signup'>
          <p>Don't have an account? Signup</p>
          </Link>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default LoginPage;
