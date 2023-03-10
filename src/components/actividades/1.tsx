import React, { useEffect } from "react";
import Iframe from 'react-iframe'
import axios from 'axios';
import '../css/estudiantes.css'
import api from '../../hooks/hooks';

const A1 = () => {
    let act_id = 1;

    // Estado de las actividades
    const [actState, setActState] = React.useState<number[]>([]);
    const getActState: Function = async (): Promise<void> => {
        const res = await api.getGroupActivities(localStorage.getItem("sub_group"), act_id);

        console.log("Actividad 1");
        console.log(res.data);

        let numarray: number[] = [];

        for (let i = 0; i < res.data.length; i++) {
            const element = res.data[i].status;
            numarray.push(element);
        }

        setActState(numarray);
    };


    // Actividades desbloqueadas
    const [actUnlocked, setActUnlocked] = React.useState<number[]>([]);
    const saveActUnlocked: Function = async (): Promise<void> => {
        localStorage.setItem("quest" + act_id, JSON.stringify(actUnlocked));
    }

    const loadActUnlocked: Function = async (): Promise<void> => {
        let act = localStorage.getItem("quest" + act_id);
        if (act != null) {
            let actarray = JSON.parse(act);
            setActUnlocked(actarray);
        } else {
            let numarray: number[] = [];
            for (let i = 0; i < 10; i++) {
                numarray.push(0);
            }
            setActUnlocked(numarray);
            saveActUnlocked();
        }
    }

    const unlockAct: Function = async (id: number): Promise<void> => {
        let act = localStorage.getItem("quest" + act_id);
        if (act != null) {
            let actarray = JSON.parse(act);
            actarray[id] = 1;
            setActUnlocked(actarray);
            saveActUnlocked();
        }

        saveActUnlocked();
    }


    useEffect(() => {
        loadActUnlocked();
        getActState();
    }, []);

    return (
        <div>
            <h1>Actividad 1</h1>

            <button onClick={() => getActState()}>hihi</button>

            <h2>Actividad 1.1</h2>
            {
                actState[0] == 1 ? ( // Contenido de la actividad
                    <div>
                        <Iframe url="https://playcanv.as/p/jNRjv0AS/"
                            width="100%"
                            height="100%"
                            id=""
                            className="bg-frame"
                            display="block"
                        />

                        {actUnlocked[1] != 0 ? <button onClick={() => unlockAct(1)}>Desbloquear actividad 1.2</button> : <button onClick={() => unlockAct(1)}>Desbloquear actividad 1.2</button>}
                    </div>
                ) : <div> El profesor no ha activado esta actividad </div>
            }

            <h2>Actividad 1.2</h2>
            {
                actState[1] == 1 && actUnlocked[1] == 1 ? ( // Contenido de la actividad
                    <div>
                        <Iframe url="https://playcanv.as/p/jNRjv0AS/"
                            width="100%"
                            height="100%"
                            id=""
                            className="bg-frame"
                            display="block"
                        />

                        {actUnlocked[2] != 0 ? <button onClick={() => unlockAct(2)}>Desbloquear actividad 1.3</button> : null}
                    </div>
                ) : actUnlocked[1] != 1 ? <div>Desbloquea la actividad anterior para poder acceder a esta</div> : <div> El profesor no ha activado esta actividad </div>
            }

        </div>
    );
}

export default A1;