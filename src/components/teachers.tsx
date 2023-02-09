import React from "react";
import axios from 'axios';

interface Student {
    id: number;
    username: string;
    role: number;
}

const Teachers = () => {
    const [students, setStudents] = React.useState<Student[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const getStudents: Function = async (): Promise<void> => {
        setLoading(true);
        const res = await axios.get('http://192.100.20.167:3000/api/users');
        setStudents(res.data.data);
        setLoading(false);

        console.log(res.data);
    }

    return (
        <div>
            <h1>Teachers</h1>

            <button onClick={() => { getStudents() }}>Get Students</button>

            {
                loading ? <h2>Loading...</h2> : <>
                    {
                        students.map((student: Student) => {
                            return (
                                <div key={student.id}>
                                    <h2>{student.username}</h2>
                                    <h3>{student.role}</h3>
                                </div>
                            );
                        })
                    }
                </>
            }
        </div>
    );
}

export default Teachers;