import React, { useEffect } from "react";
import Iframe from 'react-iframe'
import axios from 'axios';
import '../css/estudiantes.css'
import '../css/forum.css'
import api from '../../hooks/hooks';

interface message {
    id: number;
    id_user: number;
    name: string;
    lastname: string;
    message: string;
    time: string;
}

let role:any = "4"

const Foro = () => {
    const [messages, setMessages] = React.useState<message[]>([]);

    const getMessages: Function = async (): Promise<void> => {
        const res = await api.getMessages(localStorage.getItem("sub_group"));
        console.log(res.data);

        // Sort messages by time (YYYY-MM-DD HH:MM:SS) from newest to oldest
        res.data.sort((a: message, b: message) => {
            let date_a = a.time.split(" ")[0].split("-");
            let time_a = a.time.split(" ")[1].split(":");

            let date_b = b.time.split(" ")[0].split("-");
            let time_b = b.time.split(" ")[1].split(":");

            let a_date = new Date(parseInt(date_a[0]), parseInt(date_a[1]), parseInt(date_a[2]), parseInt(time_a[0]), parseInt(time_a[1]), parseInt(time_a[2]));
            let b_date = new Date(parseInt(date_b[0]), parseInt(date_b[1]), parseInt(date_b[2]), parseInt(time_b[0]), parseInt(time_b[1]), parseInt(time_b[2]));

            if (a_date > b_date) {
                return -1;
            } else if (a_date < b_date) {
                return 1;
            } else {
                return 0;
            }
        }
        );

        setMessages(res.data);
    };

    const sendMessage: Function = async (message:string): Promise<void> => {
        if (message == "") return;
        const res = await api.uploadMessage(localStorage.getItem("id"), message, localStorage.getItem("sub_group"));
        console.log(res.data);

        // Empty input
        (document.querySelector(".foro__input input") as HTMLInputElement).value = "";

        getMessages();
    };

    const deleteMessage: Function = async (id: string): Promise<void> => {
        const res = await api.deleteMessages(id);
        console.log(res.data);

        getMessages();
    };

    useEffect(() => {
        getMessages();
        role = localStorage.getItem("role") != null ? localStorage.getItem("role") : "4";
        console.log(role);
    }, []);

    return (
        <div>
            <h1>Foro</h1>

            <div className="foro">
            <div className="foro__input">
                    <input type="text" placeholder="Escribe tu mensaje" />
                    <button onClick={() => sendMessage((document.querySelector(".foro__input input") as HTMLInputElement).value)}>Enviar</button>
                </div>
                <div className="foro__messages">
                    {
                        messages.map((message) => {
                            return (
                                <div className="foro__message">
                                    <div className="foro__message__header">
                                        <h3>{message.name} {message.lastname}</h3>
                                        <p>{message.time}</p>

                                    </div>
                                    <p>{message.message}</p>

                                    {
                                        localStorage.getItem("id") == message.id_user.toString() || role == "1" || role == "2" || role == "3" ?
                                            <button onClick={() => deleteMessage(message.id.toString())} className="foro__message__delete">Eliminar</button> :
                                            <></>
                                    }

                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Foro;