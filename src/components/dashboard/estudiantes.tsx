import React, { useEffect } from "react";
import Iframe from 'react-iframe'
import axios from 'axios';
import '../css/estudiantes.css'
import api from '../../hooks/hooks';
import { Link, Route } from "react-router-dom";
import A1 from "../actividades/1";
import A2 from "../actividades/2";


interface Quest {
    id: number;
    label: string;
    description: string;
}

interface QuestGroup {
    id: number;
    label: string;
    description: string;
    id_quest: number;
    id_group: number;
    status: boolean;
}

let group_profesor = -1;

const Estudiante = () => {
    const [amongus_rap, setAmongusRap] = React.useState<boolean>(false);
    const [activity, setActivity] = React.useState<number>(0);

    const getUsers: Function = async (): Promise<void> => {
        const res = await api.getAllUsers();
        let all_users = res.data;
        let tutor_id = localStorage.getItem("id");
        console.log("Tutor id: " + tutor_id);

        // Find the tutor's group
        if (group_profesor == -1) {
            let dat = await api.getUserById(localStorage.getItem("id"));
            console.log(dat.data);
            group_profesor = dat.data.subgroup;
            localStorage.setItem("sub_group", group_profesor.toString());
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
                description: element.description
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
                    description: actividades[i].description,
                    id_quest: actividades[i].id,
                    id_group: group_profesor,
                    status: false,
                });
            } else {
                console.log("Found");
                final.push({
                    id: 0,
                    label: actividades[i].label,
                    description: actividades[i].description,
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
                    // If both are the same status, remove the second one
                    if (final[i].status == false && final[j].status == false) {
                        final.splice(j, 1);
                    } else if (final[i].status == true && final[j].status == false) {
                        final.splice(j, 1);
                    } else if (final[i].status == false && final[j].status == true) {
                        final.splice(i, 1);
                    } else {
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

            {
                amongus_rap ? <>
                                    <button onClick={
                        () => {
                            console.log("Clicked");
                            setAmongusRap(false);
                        }
                    }>Ir atras</button>
                    {
                        activity == 1 ? <A1 /> :
                        activity == 2 ? <A2/> :
                        // activity == 3 ? <A3/> :
                        // activity == 4 ? <A4/> :
                        // activity == 5 ? <A5/> :
                        // activity == 6 ? <A6/> :
                        <div></div>
                    }

                </>
                    :
                    <>
                        <div className="actividades">
                            <h1>Actividades</h1>
                            {
                                currentQuests.map((quest) => {
                                    return (
                                        quest.status ?
                                            <div className="actividad">
                                                <h2>{quest.label}</h2>
                                                <p>{quest.description}</p>
                                                <button onClick={
                                                    () => {
                                                        console.log("Clicked");
                                                        setAmongusRap(true);
                                                        setActivity(quest.id_quest);
                                                    }
                                                }>Entrar</button>
                                            </div>
                                            : <div></div>
                                    )
                                })
                            }
                        </div>
                    </>
            }


        </div>
    );
}

export default Estudiante;