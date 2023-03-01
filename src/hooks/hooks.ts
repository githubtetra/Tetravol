import axios from "axios";

const db_ip = "138.68.98.150:3001"
const ip_local = "192.100.20.167:3000"
const web_api = "ccitubapi.gamecademy.com:3000"
const url = "http://"+ip_local+"/";

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


function test() {
    console.log("test");
}

const login:Function = async (email:string, password:string) => {
    const instance = axios.create();
    instance.defaults.timeout = 2500;
    const response = await instance.post("http://192.100.20.167:3000/users/login", {
        email: email,
        password: password
    });

    return response.data;
}

export default { test, login };