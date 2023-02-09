import React from "react";

interface Props {
    id: number;
    name: string;
    pass: string;
    role: string;
    handleLogin: (e: React.FormEvent) => void;
}

const Dashboard = () => {

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;