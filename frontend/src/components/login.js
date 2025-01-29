import { useState } from "react";
import axios from "axios";
import './signup.css';

const Login = ({ setAction }) => {
    const [emailid, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/login", {
                emailid,
                password
            });
console.log(response)
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input 
                        type="email" 
                        placeholder="Email Id" 
                        value={emailid}
                        onChange={(e) => setEmailId(e.target.value)}
                    />
                </div>
                <div className="input">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="forgot-password">
                Forgot password? <span>Click Here!</span>
            </div>
            {message && <p className="message">{message}</p>}
            <div className="submit-container">
                <button className="submit" onClick={handleLogin}>Login</button>
                <div className="switch-text">
                    Don't have an account? <span onClick={() => setAction("Sign Up")}>Sign Up</span>
                </div>
            </div>
        </div>
    );
};

export default Login;