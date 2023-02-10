import React from "react";
import Teachers from "./teachers";
import Admin from "./admin";

interface User {
    id: number;
    username: string;
    role: string;
}

const Dashboard = () => {

    const user: User = {
        id: parseInt(localStorage.getItem('id') || '0'),
        username: localStorage.getItem('username') || '',
        role: localStorage.getItem('role') || '' // 1: admin, 2: teacher, 3: student
    }

    const logout:Function = ():void => {
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('role');

        window.location.reload();
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <button onClick={() => {logout()}}>Logout</button>

            {
                user.role === '1' ? <>
                <Admin />
                </> : user.role === '2' ? <>
                <Teachers />
                </> : <>
                <h2>Student</h2>
                </>
            }
        </div>
    );
}

export default Dashboard;