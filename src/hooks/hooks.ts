import axios from "axios";

const db_ip = "138.68.98.150:3001"
const ip_local = "192.100.20.167:3000"
const web_api = "ccitubapi.gamecademy.com:3000"
const url = "https://953c-91-126-37-132.ngrok.io/";

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
        headers: {
            'ngrok-skip-browser-warning': true
          },
        email: email,
        password: password
    });

    return response.data;
}

/// Users
const getAllUsers:Function = async () => {
    const response = await axios.get(url+"users",{
        headers: {
            'ngrok-skip-browser-warning': true
          },
    });
    return response.data;
}

const getUserById:Function = async (id:number) => {
    const response = await axios.get(url+"users/" + id, {
        headers: {
            'ngrok-skip-browser-warning': true
          },
    });
    console.log("getUserById");
    console.log(response.data);
    return response.data;
}

const addUser:Function = async (user:User) => {
    const response = await axios.post(url+"users/register", {
        headers: {
            'ngrok-skip-browser-warning': true
          },
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
    const response = await axios.post(url+"users/delete/" + id,{
        headers: {
            'ngrok-skip-browser-warning': true
          },
    });
    return response.data;
}

const updateUser:Function = async (user:User) => {
    const response = await axios.post(url+"users/update/" + user.id, {
        headers: {
            'ngrok-skip-browser-warning': true
          },
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
    const response = await axios.post(url+"group/tutor/" + id, {
        headers: {
            'ngrok-skip-browser-warning': true
          },
    });
    return response.data;
}

/// Groups
const getAllGroups:Function = async () => {
    const response = await axios.get(url+"groups/" + "primary", {
        headers: {
            'ngrok-skip-browser-warning': true
          },
    });
    return response.data;
}

const addPrimaryGroup:Function = async (group:Group) => {
    const response = await axios.post(url+"groups/create/primary", {
        headers: {
            'ngrok-skip-browser-warning': true
          },
        label: group.label,
        id_tutor: group.id_tutor
    }
    );
    return response.data;
}


// Subgroups
const addSecondaryGroup:Function = async (label_g: string, primary_id: string) => {
    const response = await axios.post(url+"groups/create/secondary", {
        headers: {
            'ngrok-skip-browser-warning': true
          },
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
    const response = await axios.get(url+"quests/get/quests", {
        headers: {
            'ngrok-skip-browser-warning': true
          },
    });
    return response.data;
}

const getQuestsStatus:Function = async () => {
    const response = await axios.get(url+"quests/get/groups", {
        headers: {
            'ngrok-skip-browser-warning': true
          },
    });
    return response.data;
}

const changeQuestStatus:Function = async (id_quest:number, id_group:number, status: number) => {
    const response = await axios.post(url+"quests/update", {
        headers: {
            'ngrok-skip-browser-warning': true
          },
        id_quest: id_quest,
        id_group: id_group,
        status: status
    });
    return response.data;
}


// Forum
const uploadMessage:Function = async (user_id:number, message:string, subgroup:number) => {
    const response = await axios.post(url+"forum/send", {
        headers: {
            'ngrok-skip-browser-warning': true
          },
        username_id: user_id,
        message: message,
        id_subgroup: subgroup
    });
    return response.data;
}

const getMessages:Function = async (subgroup:number) => {
    const response = await axios.get(url+"forum/" + subgroup.toString(), {
        headers: {
            'ngrok-skip-browser-warning': true
          },
    });
    return response.data;
}

const deleteMessages:Function = async (id:number) => {
    const response = await axios.post(url+"forum/delete/" + id, {
        headers: {
            'ngrok-skip-browser-warning': true
          },
    });
    return response.data;
}

// Activities
const getGroupActivities:Function = async (group_id: number, id_quest: number) => {
    const response = await axios.get(url+"quests/get/activity/" + group_id.toString() + "/" + id_quest.toString(), {
        headers: {
            'ngrok-skip-browser-warning': true
          },
    });
    return response.data;
}

const changeGroupActivityState: Function = async (group_id: number, id_quest: number, state: number) => {
    const response = await axios.post(url+"quests/update/activity", {
        headers: {
            'ngrok-skip-browser-warning': true
          },
        id_subgroup: group_id,
        id_quest: id_quest,
        status: state
    });

    return response.data;
}

export default { test, login, getAllUsers, getAllGroups, getUserById, addUser, addPrimaryGroup, deleteUser, updateUser, getTutorSubgroups, addSecondaryGroup, getAllQuests, getQuestsStatus, changeQuestStatus, uploadMessage, getMessages, deleteMessages, getGroupActivities, changeGroupActivityState };