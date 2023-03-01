import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login';

interface User {
  id: number;
  name: string;
  password: string;
  role: string;
}

function App() {

  const handleLogin = (e: React.FormEvent) => {
    console.log("Login");
    window.location.reload();
  }

  return (
    <div className="App">
      {
        localStorage.getItem('id') ? <Dashboard /> : <Login handleLogin={handleLogin} />
      }

    </div>
  );
}

export default App;
