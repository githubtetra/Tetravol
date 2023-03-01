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

const Admin = () => {

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

        setUsers(res.data);
    };

    const addUser: Function = async (user: User): Promise<void> => {
        if (user.group === 0) {
            user.group = 1;
        }
        user.subgroup = null;
        user.role = 2;

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
            group: user.group,
            subgroup: 0,
            role: 0,
        });
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
        const res = await api.getAllGroups();

        setGroups(res.data);
    };

    const addGroup: Function = async (group: Group): Promise<void> => {
        if (group.label === "") {
            alert("Please fill all the fields");
            return;
        }

        if (group.id_tutor === -1) {
            alert("Please select a tutor");
            return;
        }

        await api.addPrimaryGroup(group);
        getGroups();
    };


    useEffect(() => {
        getUsers();
        getGroups();
    }, []);

    return (
        <div>
            <h1>Admin</h1>

            {/* Add Tutor */}
            <h2>Add Tutor</h2>
            <form>
                <label>Name</label>
                <input type="text" name="name" value={newuser.name} onChange={(e) => setNewUser({ ...newuser, name: e.target.value })} />
                <label>Lastname</label>
                <input type="text" name="lastname" value={newuser.lastname} onChange={(e) => setNewUser({ ...newuser, lastname: e.target.value })} />
                <label>Email</label>
                <input type="email" name="email" value={newuser.email} onChange={(e) => setNewUser({ ...newuser, email: e.target.value })} />
                <label>Group</label>
                <select name="group" value={newuser.group} onChange={(e) => setNewUser({ ...newuser, group: parseInt(e.target.value) })}>
                    {
                        groups.map((group: Group) => (
                            <option key={group.id} value={group.id}>{group.label}</option>
                        ))
                    }
                </select>

                <button type="button" onClick={() => {
                    addUser(newuser)
                }}>Add Tutor</button>
            </form>

            {/* Add group */}
            <h2>Add Group</h2>
            <form>
                <label>Label</label>
                <input type="text" name="label" value={newgroup.label} onChange={(e) => setNewGroup({ ...newgroup, label: e.target.value })} />
                <label>Tutor</label>
                <select name="tutor" value={
                    newgroup.id_tutor === null ? -1 : newgroup.id_tutor
                } onChange={(e) => setNewGroup({ ...newgroup, id_tutor: parseInt(e.target.value) })}>
                    <option value={-1}>-- Select Tutor --</option>
                    {
                        users.map((user: User) => (
                            user.role === 2 ? <option key={user.id} value={user.id}>{user.name} {user.lastname}</option> : null
                        ))
                    }
                </select>

                <button type="button" onClick={() => {addGroup(newgroup)}}>Add Group</button>
            </form>


            {/* See all groups */}
            <h2>All Groups</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Label</th>
                        <th>Tutor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        groups.map((group: Group) => (
                            <tr key={group.id}>
                                <td>{group.id}</td>
                                <td>{group.label}</td>
                                <td>{group.id_tutor}</td>
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
                        <th>Group</th>
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
                                <td>{user.group}</td>
                                {/* <td>{user.subgroup}</td> */}
                                <td>{number_to_Role(user.role)}</td>
                                <td>
                                    <button disabled>Edit</button>
                                    <button disabled>Delete</button>
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
                            <label>Nombre</label>
                            <input type="text" value={editCurrentUser.name} onChange={(e) => setEditCurrentUser({ ...editCurrentUser, name: e.target.value })} />

                            <label>Apellido</label>
                            <input type="text" value={editCurrentUser.lastname} onChange={(e) => setEditCurrentUser({ ...editCurrentUser, lastname: e.target.value })} />

                            <label>Email</label>
                            <input type="text" value={editCurrentUser.email} onChange={(e) => setEditCurrentUser({ ...editCurrentUser, email: e.target.value })} />

                            <label>Contraseña</label>
                            <input type="text" value={editCurrentUser.password} onChange={(e) => setEditCurrentUser({ ...editCurrentUser, password: e.target.value })} />

                            <button>Guardar</button>
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

export default Admin;
