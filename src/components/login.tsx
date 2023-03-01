import React, { useState } from 'react';
import axios from 'axios';
import api from '../hooks/hooks';
import ecrypt from '../components/comp/encrypt';
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


const Login = () => {
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
            return;
        }

        await api.login(email, password).then((res:any) => {
            console.log(res);
            setUser(
                {
                    id: res.data.id,
                    name: res.data.name,
                    lastname: res.data.lastname,
                    email: res.data.email,
                    password: res.data.password,
                    group: res.data.group,
                    subgroup: res.data.subgroup,
                    role: res.data.role,
                }
            );
            console.log(user.email);

            localStorage.setItem('email', user.email);
            localStorage.setItem('password', ecrypt.encrypt(user.password));
            
        }).catch((err:any) => {
            console.log("Error: ")
            console.log(err);
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