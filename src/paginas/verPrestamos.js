import React, {Fragment} from "react";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {useNavigate, useParams} from "react-router-dom";


function VerPrestamos() {
    let {profesorId} = useParams();
    const navigate = useNavigate();

    return(
        <Fragment>
            <div className="bg-secondary d-flex flex-column" style={{minHeight: '100vh'}}>
                <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img className="mx-3" src={BASEAPI + "/logotipo.svg"} alt="" width={"45"} height={"45"}/>
                            {NOMBREAPP}
                        </a>
                        <a className="navbar-text" href="/" onClick={() => localStorage.clear()}>Cerrar sesión</a>
                    </div>
                </nav>
                <div
                    className="contenedorCuerpo bg-secondary flex-grow-0 d-flex justify-content-center align-items-center">
                    <div className="contenedor-interior d-flex justify-content-center align-items-center">
                        <button className="btn btn-primary mt-3 px-5 py-4" onClick={() => navigate("/crear/prestamo/" + profesorId)}>
                            <p>Crear un nuevo préstamo</p>
                            <img className="" src={BASEAPI + `/crear.svg`} alt="" width="45" height="45"/>
                        </button>
                    </div>
                </div>
                <nav className="BarraInferior navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
                    <div className="container">
                        <p className="navbar-text m-0" style={{textAlign: "center", width: "100%", fontSize: 14}}>Luis Miguel de Cara Ráez - IES Oretania</p>
                    </div>
                </nav>
            </div>
        </Fragment>
    )
}

export default VerPrestamos;