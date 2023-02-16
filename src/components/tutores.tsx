import React, { useEffect } from "react";
import axios from 'axios';

import databhooks from '../hooks/hooks';

interface Student {
	id: number;
	username: string;
	password: string;
	role: number;
	group: string;
    editing: boolean;
}

interface Group {
	id_group: number;
	teacher_id: number;
	label: string;
}

const Teachers = () => {
    const [students, setStudents] = React.useState<Student[]>([]);

    const [group, setGroup] = React.useState<Group>({
        id_group: 0,
        teacher_id: 0,
        label: "",
    });

    const [newuser, setNewUser] = React.useState<Student>({
        id: 0,
        username: "",
        password: "",
        role: 0,
        group: "",
        editing: false,
    });


    const getGroup: Function = async (): Promise<void> => {
        const data = await databhooks.getGroupById(localStorage.getItem('group_id'));
        setGroup(data);
    }




    const getStudents: Function = async (): Promise<void> => {
        const data = await databhooks.getStudentByIdGroup(localStorage.getItem('group_id'));
        setStudents(data);
    }

    const editStudent: Function = async (id: number): Promise<void> => {
        // Remove editing from all students
        setStudents(students.map((student) => {
            student.editing = false;
            return student;
        }));
        
        setStudents(students.map((student) => {
            if (student.id === id) {
                student.editing = true;
            }
            return student;
        }));

        // getStudents();
    }

    useEffect(() => {
        getStudents();
        getGroup();
    }, []);

    return (
        <div>
            <h1>Tutores</h1>

            <button onClick={() => { getStudents() }}>Get Students</button>

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
                        student.editing ? (
                            <tr key={student.id}>
                                <td><input type="text" value={student.username} onChange={(e) => { setNewUser({ ...newuser, username: e.target.value }) }} /></td>
                                <td><input type="text" value={student.password} onChange={(e) => { setNewUser({ ...newuser, password: e.target.value }) }} /></td>
                                <td><input type="number" value={student.role} onChange={(e) => { setNewUser({ ...newuser, role: parseInt(e.target.value) }) }} /></td>
                                <td><input type="text" value={student.group} onChange={(e) => { setNewUser({ ...newuser, group: e.target.value }) }} /></td>
                                <td>
                                    <button onClick={() => { editStudent(student.id) }}>Edit</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={student.id}>
                                <td>{student.username}</td>
                                <td>{student.password}</td>
                                <td>{student.role}</td>
                                <td>{student.group}</td>
                                <td>
                                    <button onClick={() => { editStudent(student.id) }}>Edit</button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Teachers;