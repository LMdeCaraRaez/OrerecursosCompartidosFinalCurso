import React, {Fragment, useEffect} from "react";
import {useParams} from 'react-router-dom';

function CorreoVerificado() {
    let {correoaverificar, tipousuario} = useParams();

    useEffect(() => {

        fetch(`http://localhost:9000/verificarcorreo/${correoaverificar}/${tipousuario}`, {
            method: "POST",
        }).then(res => res.text()
            .then(res => {
                console.log(res)
                setResultado(res)
            })
            .catch(err => console.error(err)))


    }, []);

    return (
        <Fragment>
            <h1>Correo Verificado{correoaverificar} </h1>
        </Fragment>
    );
}

export default CorreoVerificado;