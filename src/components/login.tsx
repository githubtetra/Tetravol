// api http://192.100.20.167:3000/api/status
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'

interface Props {
    id: number;
    name: string;
    pass: string;
    role: string;
    handleLogin: (e: React.FormEvent) => void;
}

const Login: React.FC<Props> = ({ id, name, pass, role, handleLogin }) => {
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

            // Call the handleLogin function from App.tsx
            handleLogin(e);
        }
    }

    return (
        <div className="login">
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