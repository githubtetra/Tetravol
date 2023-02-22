import React, { useEffect } from "react";
import axios from 'axios';

import api from '../hooks/hooks';

interface Student {
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

const Tutores = () => {
    const [students, setStudents] = React.useState<Student[]>([]);
    const [groups, setGroups] = React.useState<Group[]>([]);
    const [editing, setEditing] = React.useState<boolean>(false);

    const [group, setGroup] = React.useState<Group>({
        id_group: 0,
        teacher_id: 0,
        label: "",
    });

    const [newuser, setNewUser] = React.useState<Student>({
        id: 0,
        username: "",
        password: "",
        role: 3,
        group: "",
    });


    const getGroup: Function = async (): Promise<void> => {
        const data = await api.getGroupById(localStorage.getItem('group_id'));
        setGroup(data);

        const allgroups = await api.getAllGroups();
        setGroups(allgroups);
    }

    const getStudents: Function = async (): Promise<void> => {
        // const data = await api.getStudentByIdGroup(localStorage.getItem('group_id'));
        const data = await api.getAllGroupMembers(localStorage.getItem('group_id'));
        setStudents(data);
    }

    const editStudent: Function = async (id: number): Promise<void> => {
        setEditing(true);
        const data = students.find((student) => student.id === id);
        if (data) setNewUser(data);
    }

    const updateStudent: Function = async (id: number): Promise<void> => {
        setEditing(false);
        await api.editUser(newuser);
        resetnewuser();
        getStudents();
    }

    const cancelEdit: Function = async (): Promise<void> => {
        setEditing(false);
        resetnewuser();
    }

    const resetnewuser: Function = async (): Promise<void> => {
        setNewUser({
            id: 0,
            username: "",
            password: "",
            role: 3,
            group: localStorage.getItem('group_id') === null ? "" : localStorage.getItem('group_id')!,
        });
    }

    const deleteStudent: Function = async (id: number): Promise<void> => {
        await api.deleteUser(id);
        getStudents();
    }

    const addUser: Function = async (): Promise<void> => {
        newuser.group = localStorage.getItem('group_id') === null ? "" : localStorage.getItem('group_id')!;
        await api.addUser(newuser);
        getStudents();
    }
    

    useEffect(() => {
        getStudents();
        getGroup();
    }, []);

    return (
        <div>
            <h1>Tutores</h1>
            
			{/* Add users */}
			<div className="add-user">
				<h2>Afegir usuari</h2>
				<form>
					<div className="form-group">
						<label>Nom d'usuari:</label>
						<input type="text" name="username" value={newuser.username} onChange={(e) => setNewUser({ ...newuser, username: e.target.value })} />
					</div>

					<div className="form-group">
						<label>Contrasenya:</label>
						<input type="text" name="password" value={newuser.password} onChange={(e) => setNewUser({ ...newuser, password: e.target.value })} />
					</div>

					<div className="form-group">
						<label>Rol:</label>
						<select name="role" value={newuser.role} onChange={(e) => setNewUser({ ...newuser, role: parseInt(e.target.value) })}>
							{/* <option value="1">Admin</option> */}
							<option value="3">Professor</option>
							<option value="4">Estudiant</option>
						</select>
					</div>
				</form>

				<button onClick={() => { addUser(); }}>Afegir</button>
			</div>
                    

            <h2>{group.label}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Group</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    </tr>
                    {/* Show all student information and when click button edit change text to input fields */}
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.username}</td>
                            <td>{student.password}</td>
                            <td>{api.from_id_to_role(student.role)}</td>
                            <td>{student.group}</td>
                            <td>
                                <button onClick={() => { editStudent(student.id) }}>Edit</button>

                                {
                                    student.id.toString() === localStorage.getItem('id') ? (
                                        null
                                    ) : (
                                        <button onClick={() => { deleteStudent(student.id) }}>Delete</button>
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit student */}
            {
                editing === true ? (
                    <div className="edit-user">
                        <h2>Editar usuario</h2>
                        <form>
                            <label>Username</label>
                            <input type="text" name="username" value={newuser.username} onChange={(e) => setNewUser({ ...newuser, username: e.target.value })} />
                            <label>Password</label>
                            <input type="text" name="password" value={newuser.password} onChange={(e) => setNewUser({ ...newuser, password: e.target.value })} />
                            <label>Rol</label>
                            <select name="role" value={newuser.role} onChange={(e) => setNewUser({ ...newuser, role: parseInt(e.target.value) })}>
                                {/* <option value="1">Admin</option> */}
                                <option value="3">Profesor</option>
                                <option value="4">Estudiante</option>
                            </select>
                        </form>

                        <button onClick={() => { updateStudent() }}>Guardar</button>
                        <button onClick={() => { cancelEdit() }}>Cancelar</button>
                    </div>
                ) : (
                    <div> </div>
                )
            }

        </div>
    );
}

export default Tutores;