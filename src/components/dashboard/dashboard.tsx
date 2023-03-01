import React from "react";
import Reade from "../comp/read_excel";

interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    group: number;
    subgroup: number;
    role: number;
}

interface Group {
    id: number;
    type: string; // "primary" or "secondary"
    label: string;
    id_tutor: number | null; // null if it is a secondary group
}

const Dashboard = () => {

    // const user: User = {
    //     id: parseInt(localStorage.getItem('id') || '0'),
    //     username: localStorage.getItem('username') || '',
    //     role: localStorage.getItem('role') || '' // 1: admin, 2: teacher, 3: student
    // }

    const logout:Function = ():void => {
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('role');

        window.location.reload();
    }

    return (
        <div>
            <Reade/>
            <img src="https://eurolab.com.es/wp-content/uploads/2019/02/UB-BARNA.png" alt="Logo" width="100" height="100"  className="logo"/>
            <h1>Dashboard</h1>

            <button onClick={() => {logout()}}>Logout</button>
        </div>
    );
}

export default Dashboard;