import React, { useEffect } from "react";
import Iframe from 'react-iframe'
import axios from 'axios';
import '../css/estudiantes.css'
import api from '../../hooks/hooks';
import { Link, Route } from "react-router-dom";
import A1 from "../actividades/1";


interface Quest {
    id: number;
    label: string;
}

interface QuestGroup {
    id: number;
    label: string;
    id_quest: number;
    id_group: number;
    status: boolean;
}

let group_profesor = -1;

const Estudiante = () => {
    const getUsers: Function = async (): Promise<void> => {
        const res = await api.getAllUsers();
        let all_users = res.data;
        let tutor_id = localStorage.getItem("id");
        console.log("Tutor id: " + tutor_id);

        // Find the tutor's group
        if (group_profesor == -1) {
            let tutor_group = -1;
            for (let i = 0; i < all_users.length; i++) {
                console.log(all_users[i].id + " " + tutor_id);
                if (all_users[i].id == tutor_id) {
                    console.log("Tutor group: " + all_users[i].group);
                    tutor_group = all_users[i].group;
                    group_profesor = tutor_group;
                    break;
                }
            }
        }
    };
    // Actividades
    const [actividades, setActividades] = React.useState<Quest[]>([]);
    const [currentQuests, setCurrentQuests] = React.useState<QuestGroup[]>([]);

    const getAllQuests: Function = async (): Promise<void> => {
        const res = await api.getAllQuests();

        for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            console.log("aaaa" + element.label);
            let a: Quest = {
                id: element.id,
                label: element.label,
            }

            actividades.push(a);
        }
        
        await getCurrentQuests();
    };

    const getCurrentQuests: Function = async (): Promise<void> => {
        if (actividades.length == 0) {
            console.log("No activities found yet " + actividades.length);
            // Sleep for 1 second and then try again
            setTimeout(getCurrentQuests, 1000);
            return;
        }

        const res = await api.getQuestsStatus();
        let final: QuestGroup[] = [];

        for (let i = 0; i < actividades.length; i++) {
            let found = false;
            let status = false;
            console.log("IN" + actividades[i].label);

            for (let j = 0; j < res.data.length; j++) {
                if (actividades[i].id == res.data[j].id_quest && res.data[j].id_group == group_profesor) {
                    found = true;
                    status = res.data[j].status == 1 ? true : false;
                    console.log("Shit is active or not? " + status + " " + res.data[j].status);
                    break;
                }
            }

            if (!found) {
                console.log("Not found" + actividades[i].label);
                final.push({
                    id: 0,
                    label: actividades[i].label,
                    id_quest: actividades[i].id,
                    id_group: group_profesor,
                    status: false,
                });
            } else {
                console.log("Found");
                final.push({
                    id: 0,
                    label: actividades[i].label,
                    id_quest: actividades[i].id,
                    id_group: group_profesor,
                    status: status,
                });
            }
        }

        // Loop through the final array and search for repeated elements and remove the one with status false
        for (let i = 0; i < final.length; i++) {
            for (let j = i + 1; j < final.length; j++) {
                if (final[i].id_quest == final[j].id_quest) {
                    console.log("Equal");
                    // If the status is false, remove the element, otherwise remove the other one
                    // If both are true, remove the second one
                    if (final[i].status == false) {
                        final.splice(i, 1);
                    }
                    else if (final[j].status == false) {
                        final.splice(j, 1);
                    }
                    else {
                        final.splice(j, 1);
                    }
                } else {
                    console.log("Not equal");
                }
            }
        }

        setCurrentQuests(final);
    };

    useEffect(() => {
        getUsers();
        getAllQuests();
    }, []);

    return (
        <div>
            {/* <h1>Estudiante</h1> */}
            {/* <Iframe url="https://playcanv.as/p/jNRjv0AS/"
                width="100%"
                height="100%"
                id=""
                className="bg-frame"
                display="block"
                position="absolute" 
                styles={
                    {
                        zIndex: -1,
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                        margin: 0,
                        padding: 0,
                        overflow: 'hidden',
                        backgroundColor: 'transparent'
                    }
                }/> */}

            <div className="actividades">
            <h1>Actividades</h1>
                {
                    currentQuests.map((quest) => {
                        return (
                            <div className="actividad">
                                <h2>{quest.label}</h2>
                                <p>Descripción de la actividad {quest.label}</p>
                                <button onClick={
                                    () => {
                                        console.log("Clicked");
                                        
                                    }
                                }>Entrar</button>
                            </div>
                        )
                    })
                }

                {/* <div className="actividad">
                    <h2>Actividad 1</h2>
                    <p>Descripción de la actividad 1</p>
                    <button>Terminada</button>
                </div>
                <div className="actividad">
                    <h2>Actividad 2</h2>
                    <p>Descripción de la actividad 2</p>
                    <button>No terminada</button>
                </div> */}
            </div>

        </div>
    );
}

export default Estudiante;