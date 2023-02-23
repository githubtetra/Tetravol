import React from "react";
import Tutores from "./tutores";
import Admin from "./admin";
import Profesores from "./profesores";

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
            <img src="https://eurolab.com.es/wp-content/uploads/2019/02/UB-BARNA.png" alt="Logo" width="100" height="100"  className="logo"/>
            <h1>Dashboard</h1>

            <button onClick={() => {logout()}}>Logout</button>

            {
                user.role === '1' ? <>
                <Admin />
                </> : user.role === '2' ? <>
                <Tutores />
                </> : user.role == '3' ?<>
                <Profesores/>
                </> : <h2>Estudiante</h2>
            }
        </div>
    );
}

export default Dashboard;