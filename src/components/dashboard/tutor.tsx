import React, { useEffect } from "react";
import axios from "axios";
import api from "../../hooks/hooks"
import '../css/styles.css'

interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    group: number;
    subgroup: number | null;
    role: number;
}

interface Group {
    id: number;
    type: string; // "primary" or "secondary"
    label: string;
    id_tutor: number | null; // null if it is a secondary group
}

let group_tutor = -1;

const Tutor = () => {

    const number_to_Role = (role: number): string => {
        switch (role) {
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
    };


    // TODO: Users
    const [users, setUsers] = React.useState<User[]>([]);
    const [editingUser, setEditingUser] = React.useState<boolean>(false);
    const [newuser, setNewUser] = React.useState<User>({
        id: 0,
        name: "",
        lastname: "",
        email: "",
        password: "",
        group: 0,
        subgroup: 0,
        role: 0,
    });
    const [editCurrentUser, setEditCurrentUser] = React.useState<User>({
        id: 0,
        name: "",
        lastname: "",
        email: "",
        password: "",
        group: 0,
        subgroup: 0,
        role: 0,
    });

    const getUsers: Function = async (): Promise<void> => {
        const res = await api.getAllUsers();
        let all_users = res.data;
        let tutor_id = localStorage.getItem("id");
        console.log("Tutor id: " + tutor_id);

        // Find the tutor's group
        if (group_tutor == -1) {
            let tutor_group = -1;
            for (let i = 0; i < all_users.length; i++) {
                console.log(all_users[i].id + " " + tutor_id);
                if (all_users[i].id == tutor_id) {
                    console.log("Tutor group: " + all_users[i].group);
                    tutor_group = all_users[i].group;
                    group_tutor = tutor_group;
                    break;
                }
            }
        }

        if (group_tutor == -1) {
            console.log("Error: Tutor group not found:" + group_tutor);
            alert("Error: Tutor group not found");
            return;
        }
        // Filter the users that are in the tutor's group
        let tutor_users = all_users.filter((user: User) => user.group === group_tutor);

        console.log(tutor_users);

        setUsers(tutor_users);
    };

    const addUser: Function = async (user: User): Promise<void> => {
        if (group_tutor == -1) {
            console.log("Error: Tutor group not found:" + group_tutor);
            alert("Error: Tutor group not found");
            getUsers();
            return;
        }
        user.group = group_tutor;
        user.role = 3;

        if (user.name === "" || user.lastname === "" || user.email === "") {
            alert("Please fill all the fields");
            return;
        }

        if (user.email.indexOf("@") === -1) {
            alert("Please enter a valid email");
            return;
        }

        await api.addUser(user);
        setNewUser({
            id: 0,
            name: "",
            lastname: "",
            email: "",
            password: "",
            group: group_tutor,
            subgroup: 0,
            role: 0,
        });
        getUsers();
    };

    const getUserName: Function = (id: number): string => {
        let name = "";
        let res = users.filter((user: User) => user.id === id);
        if (res.length > 0) {
            name = res[0].name + " " + res[0].lastname;
        }

        return name;
    };

    const deleteUser: Function = async (id: number): Promise<void> => {
        await api.deleteUser(id);
        getUsers();
    };

    const editUser: Function = (user: User): void => {
        setEditingUser(true);
        setEditCurrentUser(user);
    };

    const updateUser: Function = async (id: number, updatedUser: User): Promise<void> => {
        setEditingUser(false);
        await api.updateUser(id, updatedUser);
        getUsers();
    };

    // TODO: Groups
    const [groups, setGroups] = React.useState<Group[]>([]);
    const [editingGroup, setEditingGroup] = React.useState<boolean>(false);

    const [newgroup, setNewGroup] = React.useState<Group>({
        id: 0,
        type: "",
        label: "",
        id_tutor: 0,
    });

    const [editCurrentGroup, setEditCurrentGroup] = React.useState<Group>({
        id: 0,
        type: "",
        label: "",
        id_tutor: 0,
    });

    const getGroups: Function = async (): Promise<void> => {
        const res = await api.getTutorSubgroups(localStorage.getItem("id"));
        console.log(res);
        setGroups(res.group);
    };

    const addGroup: Function = async (group: Group): Promise<void> => {
        if (group.label === "") {
            alert("Please fill all the fields");
            return;
        }

        if (group_tutor == -1) {
            console.log("Error: Tutor group not found:" + group_tutor);
            alert("Error: Tutor group not found");
            getGroups();
            return;
        }

        setNewGroup({
            id: 0,
            type: "subgroup",
            label: "",
            id_tutor: group_tutor,
        });


        await api.addSecondaryGroup(group.label, group_tutor);
        getGroups();
    };


    useEffect(() => {
        getUsers();
        getGroups();
    }, []);

    return (
        <div>
            <h1>Tutor</h1>

            {/* Add Tutor */}
            <h2>Add Profesor</h2>
            <form>
                <label>Name</label>
                <input type="text" name="name" value={newuser.name} onChange={(e) => setNewUser({ ...newuser, name: e.target.value })} />
                <label>Lastname</label>
                <input type="text" name="lastname" value={newuser.lastname} onChange={(e) => setNewUser({ ...newuser, lastname: e.target.value })} />
                <label>Email</label>
                <input type="email" name="email" value={newuser.email} onChange={(e) => setNewUser({ ...newuser, email: e.target.value })} />

                <label>Subgroup</label>
                <select name="subgroup" value={newuser.subgroup === null ? -1 : newuser.subgroup} onChange={(e) => setNewUser({ ...newuser, subgroup: parseInt(e.target.value) })}>
                    <option value={-1}>-- Select Subgroup --</option>
                    {
                        groups.map((group: Group) => (
                            <option key={group.id} value={group.id}>{group.label}</option>
                        ))
                    }
                </select>


                <button type="button" onClick={() => {
                    addUser(newuser)
                }}>Add Profesor</button>
            </form>

            {/* Add sub group */}
            <h2>Add Sub Group</h2>
            <form>
                <label>Label</label>
                <input type="text" name="label" value={newgroup.label} onChange={(e) => setNewGroup({ ...newgroup, label: e.target.value })} />
                {/* <label>Tutor</label>
                <select name="tutor" value={
                    newgroup.id_tutor === null ? -1 : newgroup.id_tutor
                } onChange={(e) => setNewGroup({ ...newgroup, id_tutor: parseInt(e.target.value) })}>
                    <option value={-1}>-- Select Tutor --</option>
                    {
                        users.map((user: User) => (
                            user.role === 2 ? <option key={user.id} value={user.id}>{user.name} {user.lastname}</option> : null
                        ))
                    }
                </select> */}

                <button type="button" onClick={() => { addGroup(newgroup) }}>Add Group</button>
            </form>


            {/* See all sub groups */}
            <h2>All Sub Groups</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Label</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        groups.map((group: Group) => (
                            <tr key={group.id}>
                                <td>{group.id}</td>
                                <td>{group.label}</td>
                                <td>
                                    <button disabled>Edit</button>
                                    <button disabled>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* See all users */}
            <h2>All Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Class</th>
                        {/* <th>Subgroup</th> */}
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user: User) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.subgroup}</td>
                                {/* <td>{user.subgroup}</td> */}
                                <td>{number_to_Role(user.role)}</td>
                                <td>
                                    <button onClick={() => {
                                        editUser(user)
                                    }}>Edit</button>
                                    <button onClick={() => {
                                        deleteUser(user.id)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


            {/* Edit Student */}
            {
                editingUser ? (
                    <div className="edit-user">
                        <h2>Editar usuario</h2>
                        <form>
                            <div className="editblock">
                                <label>Nombre:</label>
                                <input type="text" value={editCurrentUser.name} onChange={(e) => setEditCurrentUser({ ...editCurrentUser, name: e.target.value })} />
                            </div>

                            <div className="editblock">
                                <label>Apellido: </label>
                                <input type="text" value={editCurrentUser.lastname} onChange={(e) => setEditCurrentUser({ ...editCurrentUser, lastname: e.target.value })} />
                            </div>

                            <div className="editblock">
                                <label>Email: </label>
                                <input type="text" value={editCurrentUser.email} onChange={(e) => setEditCurrentUser({ ...editCurrentUser, email: e.target.value })} />
                            </div>

                            <div className="editblock">
                                <label>Grupo: </label>
                                <select value={editCurrentUser.subgroup == null ? -1 : editCurrentUser.subgroup} onChange={(e) => setEditCurrentUser({ ...editCurrentUser, subgroup: parseInt(e.target.value) })}>
                                    {
                                        groups.map((group: Group) => (
                                            <option key={group.id} value={group.id}>{group.label}</option>
                                        ))
                                    }
                                </select>
                            </div>


                            <button type="button" onClick={() => {
                                updateUser(editCurrentUser.id, editCurrentUser)
                            }}>Guardar</button>
                            <button>Cancelar</button>
                        </form>
                    </div>
                ) : (
                    <div>
                    </div>
                )
            }

        </div>
    );
};

export default Tutor;
