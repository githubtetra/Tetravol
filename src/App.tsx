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

  return (
    <div className="App">
      {
        <Login />
      }

    </div>
  );
}

export default App;
