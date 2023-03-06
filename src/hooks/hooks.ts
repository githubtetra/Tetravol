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
    const response = await instance.post(url + "users/login", {
        email: email,
        password: password
    });

    return response.data;
}

/// Users
const getAllUsers:Function = async () => {
    const response = await axios.get(url+"users");
    return response.data;
}

const getUserById:Function = async (id:number) => {
    const response = await axios.get(url+"users/" + id);
    console.log("getUserById");
    console.log(response.data);
    return response.data;
}

const addUser:Function = async (user:User) => {
    const response = await axios.post(url+"users/register", {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        group: user.group,
        subgroup: user.subgroup,
        role: user.role
    });
    return response.data;
}

const deleteUser:Function = async (id:number) => {
    const response = await axios.post(url+"users/delete/" + id);
    return response.data;
}

const updateUser:Function = async (user:User) => {
    const response = await axios.post(url+"users/update/" + user.id, {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        group: user.group,
        subgroup: user.subgroup,
        role: user.role
    });
    return response.data;
}

const getTutorSubgroups:Function = async (id:number) => {
    const response = await axios.post(url+"group/tutor/" + id);
    return response.data;
}

/// Groups
const getAllGroups:Function = async () => {
    const response = await axios.get(url+"groups/" + "primary");
    return response.data;
}

const addPrimaryGroup:Function = async (group:Group) => {
    const response = await axios.post(url+"groups/create/primary", {
        label: group.label,
        id_tutor: group.id_tutor
    }
    );
    return response.data;
}


// Subgroups
const addSecondaryGroup:Function = async (label_g: string, primary_id: string) => {
    const response = await axios.post(url+"groups/create/secondary", {
        label: label_g,
        id_primary: primary_id,
    }
    );
    return response.data;
}


// const deletePrimaryGroup:Function = async (id:number) => {
//     const response = await axios.post(url+"groups/delete/primary/" + id);
//     return response.data;
// }


// Quests
const getAllQuests:Function = async () => {
    const response = await axios.get(url+"quests/get/quests");
    return response.data;
}

const getQuestsStatus:Function = async () => {
    const response = await axios.get(url+"quests/get/groups");
    return response.data;
}

const changeQuestStatus:Function = async (id_quest:number, id_group:number, status: number) => {
    const response = await axios.post(url+"quests/update", {
        id_quest: id_quest,
        id_group: id_group,
        status: status
    });
    return response.data;
}

export default { test, login, getAllUsers, getAllGroups, getUserById, addUser, addPrimaryGroup, deleteUser, updateUser, getTutorSubgroups, addSecondaryGroup, getAllQuests, getQuestsStatus, changeQuestStatus };