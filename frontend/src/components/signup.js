import { useState } from "react";
import axios from "axios";
import './signup.css'

const SignUp = ({ setAction }) => {
    const [name, setName] = useState("");
    const [emailid, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignUp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/register", {
                name,
                emailid,
                password
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong");
        }
    };

    return (<>
        <div className="container">
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
            {message && <p className="message">{message}</p>}
            <div className="submit-container">
                <button className="submit" onClick={handleSignUp}>Sign Up</button>
                <div className="switch-text">
                    Already have an account? <span onClick={() => setAction("Login")}>Login</span>
                </div>
            </div>
        </div></>
    );
};

export default SignUp;