import axios from "axios";

const ip = "138.68.98.150"
const local = "192.100.20.167"
const url = "http://138.68.98.150:3000/api/";

interface User {
	id: number;
	username: string;
	password: string;
	role: number;
	group: string;
}

interface Group {
	id_group: number;
	teacher_id: number;
	label: string;
}

// Get all users
const getAllUsers:Function = async () => {
    const res = await axios.get(url + "users");
    return res.data.data;
}

// Get all groups
const getAllGroups:Function = async () => {
    
    const link = url + "users/group";
    const res = await axios.get(link);
    return res.data.data;
}

// Edit user
const editUser:Function = async (user:User) => {
    const res = await axios.post(
        url + `user/update/${user.id}`,
        {
            username: user.username,
            password: user.password,
            role: user.role,
            group: user.group,
        }
    );
    return res.data.data;
}

// Edit group
const editGroup:Function = async (name: string, id: number) => {
    const link = url + "group/update/" + id;

    const res = await axios.post(link, {
        label: name
    });
}

// Add group
const addGroup:Function = async (group: Group) => {
    const link = url + "group/create"
    const res = await axios.post(link, {
        label: group.label
    });
}

// Add user
const addUser:Function = async (user: User) => {
    console.log(
        url + `create/user`,
        {
            username: user.username,
            password: user.password,
            role: user.role,
            group: user.group,
        }
    )
    const res = await axios.post(
        url + `create/user`,
        {
            username: user.username,
            password: user.password,
            role: user.role,
            group: user.group,
        }
    );
}

// Get group by id
const getGroupById:Function = async (id: number) => {
    let link = url + "get/group/" + id;
    const res = await axios.post(link);
    return res.data.data;
}

// Get group tutor by id
const getGroupTutorById:Function = async (id: number) => {
    let link = url + "get/teacher";
    const res = await axios.get(link);

    let tutor = res.data.data.filter((tutor: any) => tutor.id === id);
    return "hola";
}

// Get sudent by id group
const getStudentByIdGroup:Function = async (id: number) => {
    const res = await axios.post(url + 'users/group/' + id);
    return res.data.data;
}

const getAllGroupMembers:Function = async (id: number) => {
    const res = await axios.get(url + 'getall/group/' + id);
    return res.data.data;
}

const funkipunkitrunki:Function = async (id_user: number, id_group: number) => {
    let link = url + "users/group/" + id_group;
    const res = await axios.post(link);
    console.log(res.data.data);
    for (let i = 0; i < res.data.data.length; i++) {

        if (res.data.data[i].id === id_user) {
            return res.data.data[i].group;
        }
    }
    // let trunko = res.data.data.filter((tutor: any) => tutor.id === id_user);
    // console.log(trunko + "FUNKO");
    // return trunko;
}

const deleteUser:Function = async (id: number) => {
    const res = await axios.post(url + "user/delete/" + id);
    return res.data.data;
}


const from_id_to_role:Function = (id: number) => {
    switch (id) {
        case 1:
            return "Admin";
        case 2:
            return "Tutor";
        case 3:
            return "Profesor";
        case 4:
            return "Estudiante";
        default:
            return "Error";
    }
}

export default { funkipunkitrunki, getAllUsers, getAllGroups, editUser, editGroup, addGroup, addUser, getGroupById, getStudentByIdGroup, from_id_to_role, getGroupTutorById, deleteUser, getAllGroupMembers };