import React, { useState } from 'react';
import axios from 'axios';
import api from '../hooks/hooks';
import dec from '../components/comp/encrypt';
import './css/styles.css'

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

interface Props {
    handleLogin: (e: React.FormEvent) => void;
}


const Login: React.FC<Props> = ({ handleLogin })  => {
    const [user, setUser] = useState<User>({
        id: 0,
        name: "",
        lastname: "",
        email: "",
        password: "",
        group: 0,
        subgroup: 0,
        role: 0,
    });

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        // console.log(email);
        e.preventDefault();

        if (email == "" || password == "") {
            console.log("Error: Empty fields");
            alert("Error: Empty fields");
            return;
        }

        api.login(email, password).then((res:any) => {
            localStorage.setItem('id', res.data.id);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('role', res.data.role);
            handleLogin(e);
            
        }).catch((err:any) => {
            console.log("Error: ")
            console.log(err);
            alert("Error: " + err);
        });
    }

    return (
        <div className="login">
            <img src="https://eurolab.com.es/wp-content/uploads/2019/02/UB-BARNA.png" alt="Logo" width="100" height="100" className="logo" />
            <form onSubmit={HandleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={email} onChange={e => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;