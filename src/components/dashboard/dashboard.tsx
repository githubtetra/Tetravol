import React, { useState } from "react";
import Reade from "../comp/read_excel";
import Admin from "./admin";
import Estudiante from "./estudiantes";
import Tutor from "./tutor";
import Profesor from "./profesor";
import Foro from "./foro";

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

let foro = false;
let url = window.location.href;

const Dashboard = () => {
    const logout: Function = (): void => {
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('role');

        window.location.reload();
    }

    useState(() => {
        url = window.location.href;
    });

    return (
        <div>
            <img src="https://eurolab.com.es/wp-content/uploads/2019/02/UB-BARNA.png" alt="Logo" width="100" height="100" className="logo" />
            <h1></h1>

            <button className="log__out" onClick={() => { logout() }}>Logout</button>
            <br></br><br></br>


            {url.endsWith("/forum") ? <Foro /> :

                <>
                    <button className="foro__btn" onClick={() => {
                        window.open(url + "/forum", "_blank");
                    }}>Cocheforos</button>

                    {
                        localStorage.getItem('role') == "1" ?
                        <Admin /> :
                        localStorage.getItem('role') == "2" ?
                        <Tutor /> :
                        localStorage.getItem('role') == "3" ? <Profesor /> :
                        localStorage.getItem('role') == "4" ? <Estudiante /> :
                        <div>ERROR</div>
                    }
                </>
            }

        </div>
    );
}

export default Dashboard;