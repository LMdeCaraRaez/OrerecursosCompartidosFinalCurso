import React, {Fragment} from "react";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";


function VerPrestamos(prestamos) {
    return(
        <Fragment>
            <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img className="mx-3" src={BASEAPI + "/logotipo.svg"} alt="" width={"45"} height={"45"}/>
                        {NOMBREAPP}
                    </a>
                    <a className="navbar-text" href="/" onClick={() => localStorage.clear()}>Cerrar sesión</a>
                </div>
            </nav>
            <div className="contenedorCuerpo bg-secondary flex-grow-0 d-flex justify-content-center align-items-center">

            </div>
            <nav className="BarraInferior navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
                <div className="container">
                    <p className="navbar-text m-0" style={{textAlign: "center", width: "100%", fontSize: 14}}>Luis
                        Miguel de Cara Ráez - IES Oretania</p>
                </div>
            </nav>
        </Fragment>
    )
}

export default VerPrestamos;