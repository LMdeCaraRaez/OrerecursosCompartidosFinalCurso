import React, {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {BASEAPI} from "../modelos/constantes";


function CorreoVerificado() {
    const navigate = useNavigate();

    let {correoaverificar, tipousuario} = useParams();
    const [setResultado] = useState("Error al verificar el correo")
    // const [resultado, setResultado] = useState("Error al verificar el correo") Se ha borrado resultado

    useEffect(() => {

        fetch(BASEAPI + `/verificarcorreo/${correoaverificar}/${tipousuario}`, {
            method: "POST",
        }).then(res => res.text()
            .then(res => {
                setResultado(res)
            })
            .catch(err => console.error(err)))


    }, []);

    return (
        <Fragment>
            <div className="card bg-primary d-flex justify-content-center align-items-center p-5 m-5">
                <h1 className="p-3">Su correo: {correoaverificar} ha sido verificado correctamente</h1>
                <button className="btn btn-secondary col-9 mt-5" onClick={ () => {
                    navigate("/")
                } }>Volver a la Página principal</button>
            </div>
        </Fragment>
    );
}

export default CorreoVerificado;