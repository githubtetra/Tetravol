import React, { useEffect } from "react";
import Iframe from "react-iframe";
import axios from "axios";
import "../css/estudiantes.css";
import api from "../../hooks/hooks";

const A1 = () => {
  let act_id = 1;

  const [playcanvasActiveIndex, setPlaycanvasActiveIndex] = React.useState<
    number
  >(-1);

  // Estado de las actividades
  const [actState, setActState] = React.useState<number[]>([]);
  const getActState: Function = async (): Promise<void> => {
    const res = await api.getGroupActivities(
      localStorage.getItem("sub_group"),
      act_id,
    );

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
  };

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
  };

  const unlockAct: Function = async (id: number): Promise<void> => {
    let act = localStorage.getItem("quest" + act_id);
    if (act != null) {
      let actarray = JSON.parse(act);
      actarray[id] = 1;
      setActUnlocked(actarray);
      saveActUnlocked();
    }

    saveActUnlocked();
  };

  useEffect(() => {
    loadActUnlocked();
    getActState();
  }, []);

  return (
    <div>
      <h1>Actividad 1</h1>
      {/* https://playcanv.as/p/jNRjv0AS/ */}

      <h2>Actividad 1.1</h2>
      {actState[0] == 1
        ? ( // Contenido de la actividad
          <div>
            {playcanvasActiveIndex == 0
              ? (
                <Iframe
                  url="https://playcanv.as/p/Pwn6gC9U/"
                  id=""
                  className="bg-frame"
                  display="block"
                />
              )
              : (
                <button onClick={() => setPlaycanvasActiveIndex(0)}>
                  Ver en Playcanvas
                </button>
              )}

            {actUnlocked[1] != 1
              ? (
                <button onClick={() => unlockAct(1)}>
                  Desbloquear actividad 1.2
                </button>
              )
              : (null
              )}
          </div>
        )
        : <div>El profesor no ha activado esta actividad</div>}

      <h2>Actividad 1.2</h2>
      {actState[1] == 1 && actUnlocked[1] == 1
        ? ( // Contenido de la actividad
          <div>
            {playcanvasActiveIndex == 1
              ? (
                <Iframe
                  url="https://playcanv.as/p/Zxqq1n4l/"
                  id=""
                  className="bg-frame"
                  display="block"
                />
              )
              : (
                <button onClick={() => setPlaycanvasActiveIndex(1)}>
                  Ver en Playcanvas
                </button>
              )}

            {actUnlocked[2] != 1
              ? (
                <button onClick={() => unlockAct(2)}>
                  Desbloquear actividad 1.3
                </button>
              )
              : null}
          </div>
        )
        : actUnlocked[1] != 1
        ? <div>Desbloquea la actividad anterior para poder acceder a esta</div>
        : <div>El profesor no ha activado esta actividad</div>}

      <h2>Actividad 1.3</h2>
      {actState[2] == 1 && actUnlocked[2] == 1
        ? ( // Contenido de la actividad
          <div>
            {playcanvasActiveIndex == 2
              ? (
                <Iframe
                  url="https://playcanv.as/p/jNRjv0AS/"
                  id=""
                  className="bg-frame"
                  display="block"
                />
              )
              : (
                <button onClick={() => setPlaycanvasActiveIndex(2)}>
                  Ver en Playcanvas
                </button>
              )}

            {actUnlocked[3] != 1
              ? (
                <button onClick={() => unlockAct(3)}>
                  Desbloquear actividad 1.4
                </button>
              )
              : null}
          </div>
        )
        : actUnlocked[2] != 1
        ? <div>Desbloquea la actividad anterior para poder acceder a esta</div>
        : <div>El profesor no ha activado esta actividad</div>}

      <h2>Actividad 1.4</h2>
      {actState[3] == 1 && actUnlocked[3] == 1
        ? ( // Contenido de la actividad
          <div>
            {playcanvasActiveIndex == 3
              ? (
                <Iframe
                  url="https://playcanv.as/p/eo2SDUhc/"
                  id=""
                  className="bg-frame"
                  display="block"
                />
              )
              : (
                <button onClick={() => setPlaycanvasActiveIndex(3)}>
                  Ver en Playcanvas
                </button>
              )}

            {actUnlocked[4] != 1
              ? (
                <button onClick={() => unlockAct(4)}>
                  Desbloquear actividad 1.5
                </button>
              )
              : null}
          </div>
        )
        : actUnlocked[3] != 1
        ? <div>Desbloquea la actividad anterior para poder acceder a esta</div>
        : <div>El profesor no ha activado esta actividad</div>}

      <h2>Actividad 1.5</h2>
      {actState[4] == 1 && actUnlocked[4] == 1
        ? ( // Contenido de la actividad
          <div>
            {playcanvasActiveIndex == 4
              ? (
                <Iframe
                  url="https://playcanv.as/p/eo2SDUhc/"
                  id=""
                  className="bg-frame"
                  display="block"
                />
              )
              : (
                <button onClick={() => setPlaycanvasActiveIndex(4)}>
                  Ver en Playcanvas
                </button>
              )}

            {actUnlocked[5] != 1
              ? (
                <button onClick={() => unlockAct(5)}>
                  Desbloquear actividad 1.6
                </button>
              )
              : null}
          </div>
        )
        : actUnlocked[4] != 1
        ? <div>Desbloquea la actividad anterior para poder acceder a esta</div>
        : <div>El profesor no ha activado esta actividad</div>}

      <h2>Actividad 1.6</h2>
      {actState[5] == 1 && actUnlocked[5] == 1
        ? ( // Contenido de la actividad
          <div>
            {playcanvasActiveIndex == 5
              ? (
                <Iframe
                  url="https://playcanv.as/p/eo2SDUhc/"
                  id=""
                  className="bg-frame"
                  display="block"
                />
              )
              : (
                <button onClick={() => setPlaycanvasActiveIndex(5)}>
                  Ver en Playcanvas
                </button>
              )}

            {actUnlocked[6] != 1
              ? (
                <button onClick={() => unlockAct(6)}>
                  Desbloquear actividad 1.7
                </button>
              )
              : null}
          </div>
        )
        : actUnlocked[5] != 1
        ? <div>Desbloquea la actividad anterior para poder acceder a esta</div>
        : <div>El profesor no ha activado esta actividad</div>}

      <h2>Actividad 1.7</h2>
      {actState[6] == 1 && actUnlocked[6] == 1
        ? ( // Contenido de la actividad
          <div>
            {playcanvasActiveIndex == 6
              ? (
                <Iframe
                  url="https://playcanv.as/p/eo2SDUhc/"
                  id=""
                  className="bg-frame"
                  display="block"
                />
              )
              : (
                <button onClick={() => setPlaycanvasActiveIndex(6)}>
                  Ver en Playcanvas
                </button>
              )}

            {actUnlocked[7] != 1
              ? (
                <button onClick={() => unlockAct(7)}>
                  Desbloquear actividad 1.8
                </button>
              )
              : null}
          </div>
        )
        : actUnlocked[6] != 1
        ? <div>Desbloquea la actividad anterior para poder acceder a esta</div>
        : <div>El profesor no ha activado esta actividad</div>}
    </div>
  );
};

export default A1;
