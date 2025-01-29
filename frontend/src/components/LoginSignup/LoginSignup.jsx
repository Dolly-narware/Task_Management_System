import { useState } from "react";
import axios from "axios"; 
import './LoginSignup.css' // Import Axios

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [name, setName] = useState("");
    const [emailid, setEmailId] = useState(""); // Backend requires emailid
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        const endpoint = action === "Sign Up" ? "/register" : "/login";
        const payload = { emailid, password };
        if (action === "Sign Up") payload.name = name; // Add name only for signup

        try {
            const response = await axios.post("http://localhost:5000/register",payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setAction("Login");
            setName("");
              setEmailId("");
              setPassword("");
            setMessage(response.data.message); // Success message
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error || "Something went wrong");
            } else {
                setMessage("Failed to connect to the server");
            }
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? null : (
                    <div className="input">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}
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
            {action === "Sign Up" ? null : (
                <div className="forgot-password">
                    Forgot password? <span>Click Here!</span>
                </div>
            )}
            {message && <p className="message">{message}</p>}
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>
                    Sign Up
                </div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>
                    Login
                </div>
                <button className="submit" onClick={handleSubmit}>
                    {action}
                </button>
            </div>
        </div>
    );
};

export default LoginSignup;