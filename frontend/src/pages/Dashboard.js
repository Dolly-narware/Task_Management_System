import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../components/AuthService';
import DisplayTodo from '../components/DisplayTodo';
import './Dashboard.css'; 

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (<>
        <div>
            <h2 className="dashboard-title">Welcome to Dashboard</h2>
            <button  className="logout-header"onClick={handleLogout}>Logout</button>
        </div>
         <DisplayTodo/> 
        </>
    );
};

export default Dashboard;
