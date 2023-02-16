import axios from "axios";

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
    const res = await axios.get("http://192.100.20.167:3000/api/users");
    return res.data.data;
}

// Get all groups
const getAllGroups:Function = async () => {
    const link = "http://192.100.20.167:3000/api/users/group";
    const res = await axios.get(link);
    return res.data.data;
}

// Edit user
const editUser:Function = async (user:User) => {
    const res = await axios.post(
        `http://192.100.20.167:3000/api/user/update/${user.id}`,
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
    const link = "http://192.100.20.167:3000/api/group/update/" + id;

    const res = await axios.post(link, {
        label: name
    });
}

// Add group
const addGroup:Function = async (group: Group) => {
    const link = "http://192.100.20.167:3000/api/group/create"
    const res = await axios.post(link, {
        label: group.label
    });
}

// Add user
const addUser:Function = async (user: User) => {
    const res = await axios.post(
        `http://192.100.20.167:3000/api/user/update/${user.id}`,
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
    let link = "http://192.100.20.167:3000/api/get/group/" + id;
    const res = await axios.post(link);
    return res.data.data;
}

// Get sudent by id group
const getStudentByIdGroup:Function = async (id: number) => {
    const res = await axios.post('http://192.100.20.167:3000/api/users/group/' + id);
    return res.data.data;
}


export default { getAllUsers, getAllGroups, editUser, editGroup, addGroup, addUser, getGroupById, getStudentByIdGroup };