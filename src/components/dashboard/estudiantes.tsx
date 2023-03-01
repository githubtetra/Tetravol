import React, { useEffect } from "react";
import Iframe from 'react-iframe'
import axios from 'axios';
import '../css/estudiantes.css'
import api from '../../hooks/hooks';

const Estudiante = () => {

    return (
        <div>
            <h1>Estudiante</h1>
            <Iframe url="https://playcanv.as/p/jNRjv0AS/"
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
                }/>
        </div>
    );
}

export default Estudiante;