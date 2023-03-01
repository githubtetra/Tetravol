import React, { useEffect, ChangeEvent, useState  } from "react";
import axios from 'axios';
import * as XLSX from 'xlsx';

interface Student {
    id: number;
    username: string;
    password: string;
    role: number;
    group: string;
}

const Read = () => {
    const [file, setFile] = useState<File | null>(null);
    const [students, setStudents] = React.useState<Student[]>([]);

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            

            axios.post("http://localhost:3000/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
        }
    }

    const handleRead = () => {

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const bstr = e.target.result;
                    const wb = XLSX.read(bstr, {type: "binary"});
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const data = XLSX.utils.sheet_to_json(ws);
                    console.log(data);

                    for (let i = 0; i < data.length; i++) {
                        const element:any = data[i];
                        const student: Student = {
                            id: i,
                            username: element.username,
                            password: "",
                            role: 4,
                            group: "",
                        }

                        setStudents([...students, student]);
                    }

                    console.log(students);
                }
            }
            reader.readAsBinaryString(file);
        }
    }


    return (
        <div>
            <input type={"file"} onChange={handleFile} accept=".xlsx" />
            <div>{file && `${file.name} - ${file.type}`}</div>
            <button onClick={handleRead}>Upload</button>
        </div>
    )
}

export default Read;