import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Dashboard from './components/dashboard';

interface User {
  id: number;
  name: string;
  password: string;
  role: string;
}

function App() {
  const [id, setId] = React.useState<number>(0);
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [role, setRole] = React.useState<string>('');

  const CheckLoginStorage: Function = ():void => {
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const pass = localStorage.getItem('pass');
    const role = localStorage.getItem('role');

    console.log("Local Storage: ", id, name, pass, role);

    setId(id ? parseInt(id) : 0);
    setUsername(name ? name : '');
    setPassword(pass ? pass : '');
    setRole(role ? role : '');
  }

  const handleLogin = (e:React.FormEvent) => {
    e.preventDefault();
    console.log("Login");
    CheckLoginStorage();
  }

  useEffect(() => {
    CheckLoginStorage();
    console.log(id, username, password, role);
  }, [id]);

  return (
    <div className="App">
      {
        id === 0 && username === '' && password === '' ? <Login id={id} name={username} pass={password} role={role} handleLogin={handleLogin}/> : <Dashboard />
      }

    </div>
  );
}

export default App;
