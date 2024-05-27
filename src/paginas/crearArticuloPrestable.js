import React, {Fragment} from "react";

function CrearArticulo() {
    return (
        <Fragment>
            <div className="bg-secondary d-flex flex-column" style={{minHeight: '100vh'}}>
                <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img className="mx-3" src="http://localhost:9000/logotipo.svg" alt="" width="45"
                                 height="45"/>
                            Orerecursos compartidos
                        </a>
                    </div>
                </nav>
                <div className="contenedor-interior d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary mt-3 px-5 py-4">
                        Crear un nuevo objeto
                    </button>
                </div>
                <nav className="BarraInferior navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom p-0">
                    <div className="container">
                        <p className="navbar-text m-0" style={{textAlign: "center", width: "100%", fontSize: 14}}>Luis
                            Miguel de Cara Ráez - IES Oretania</p>
                    </div>
                </nav>
            </div>
        </Fragment>
    );
}

export default CrearArticulo;