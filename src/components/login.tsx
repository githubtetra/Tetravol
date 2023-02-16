import axios from 'axios';
import React, { useState } from 'react';
import api from '../hooks/api';

export const Login = () => {
    const loginUrl: string = 'http://192.100.20.167:3000/api/login'

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Send the username and password to the server and get the id, user, and role
        e.preventDefault();
        const { data } = await axios.post(loginUrl, {
            username: username,
            password: password
        });

        // See if response is not 401
        if (data.status === "success") {
            // Add the id, user, and role to local storage
            localStorage.setItem('id', data.data.id);
            localStorage.setItem('username', data.data.username);
            localStorage.setItem('password', password)
            localStorage.setItem('role', data.data.role);
            localStorage.setItem('group_id', data.data.group);
        }
    }

    return (
        <div className="login">
            aaaaaaaaaaa
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>


        </div>
    );
}

export default Login;