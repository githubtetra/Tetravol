import React from "react";
import axios from 'axios';

interface User {
    id: number;
    username: string;
    pass: string;
    role: number;

    editing: boolean;
}

const Admin = () => {

    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [addingUser, setAddingUser] = React.useState<boolean>(false);

    const getUsers: Function = async (): Promise<void> => {
        setLoading(true);
        const res = await axios.get('http://192.100.20.167:3000/api/users');
        setUsers(res.data.data);
        setLoading(false);

        console.log(res.data);
    }

    const deleteUser: Function = async (id: number): Promise<void> => {
        await axios.delete(`http://192.100.20.167:3000/api/status`);
        setUsers(users.filter((user: User) => user.id !== id));
    }

    const editUser: Function = async (id: number): Promise<void> => {
        // Update the edited user
        setUsers(users.map((user: User) => {
            if (user.id === id) {
                return {
                    ...user,
                    editing: true
                }
            } else {
                return user;
            }
        }));

        console.log("Editing..." + id);
        //await axios.put(`http://192.100.20.167:3000/api/status`);
    }

    const updateUser: Function = async (id: number): Promise<void> => {
        setUsers(users.map((user: User) => {
            if (user.id === id) {
                return {
                    ...user,
                    editing: false
                }
            } else {
                return user;
            }
        }));

        console.log("Updating..." + id);
        //await axios.put(`http://
    }

    const cancelEdit: Function = async (id: number): Promise<void> => {
        setUsers(users.map((user: User) => {
            if (user.id === id) {
                return {
                    ...user,
                    editing: false
                }
            } else {
                return user;
            }
        }));

        console.log("Canceling..." + id);
    }

    const addUser: Function = async (): Promise<void> => {
        console.log("Adding...");
        addingUser ? setAddingUser(false) : setAddingUser(true);
    }


    return (
        <div>
            <h1>Admin</h1>
            {/* Admin can see all users, edit and delete */}

            {
                addingUser ? <div>
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Password" />
                    <input type="text" placeholder="Role" />
                    <button onClick={() => { addUser() }}>Add</button>
                </div> : <button onClick={() => { addUser() }}>Add User</button>
            }

            <button onClick={() => { getUsers() }}>Get Users</button>
            {
                loading ? <h2>Loading...</h2> : <>
                    {
                        users.map((user: User) => {
                            return (
                                <div key={user.id}>
                                    {

                                        user.editing ? <>
                                            <input type="text" value={user.username} />
                                            <input type="text" value={user.pass} />
                                            <input type="text" value={user.role} />

                                            <button onClick={() => { updateUser(user.id) }}>Update</button>
                                            <button onClick={() => { cancelEdit(user.id) }}>Cancel</button>
                                        </> : <>
                                            <h2>{user.username}</h2>
                                            <h3>{user.role}</h3>
                                        </>
                                    }
                                    <button onClick={() => { editUser(user.id) }}>Edit</button>
                                    <button onClick={() => { deleteUser(user.id) }}>Delete</button>
                                </div>
                            );
                        })
                    }
                </>
            }
        </div>
    );
}

export default Admin;