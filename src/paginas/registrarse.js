import React, {Fragment} from "react";

function Registrarse() {
    return (
        <Fragment>
            <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/client/src/paginas/registrarse">
                        <img src="../../recursos/imagenes/uwu.png" alt="" width="45" height="45"/>
                        Orerecursos compartidos
                    </a>
                    <a className="navbar-text">Registrarte</a>
                </div>
            </nav>
            <div className="contenedorCuerpo fixed-center" align="center">
                <div className="container contenedorCentral m-3">

                    <div className="row m-2">
                        <p className="fs-1">Registrarse</p>
                        <div className="dropdown pb-2">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                Tipo de usuario
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Profesor</a></li>
                                <li><a className="dropdown-item" href="#">Alumno</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col m-2" align="center">
                        <input type="text" className="form-control my-2" placeholder="Correo electrónico"
                               style={{width: '700px'}}/>
                        <input type="text" className="form-control my-2" placeholder="Nombre" style={{width: '700px'}}/>
                        <input type="text" className="form-control my-2" placeholder="Apellidos"
                               style={{width: '700px'}}/>
                        <input type="date" className="form-control my-2" placeholder="Fecha de nacimiento"
                               style={{width: '700px'}}/>
                        <input type="text" className="form-control my-2" placeholder="Dni" style={{width: '700px'}}/>
                        <input type="password" className="form-control my-2" placeholder="Contraseña"
                               style={{width: '700px'}}/>
                        <button type="button" onClick={() => {
                        }} className="btn btn-outline-primary my-2" style={{width: '500px'}}>Aceptar
                        </button>
                    </div>

                </div>
            </div>
            <nav className="BarraInferior navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom p-0">
                <div className="container">
                <p className="navbar-text m-0" style={{textAlign: "center", width: "100%", fontSize: 14}}>Luis
                        Miguel de Cara Ráez - IES Oretania</p>
                </div>
            </nav>
        </Fragment>
    );
}

export default Registrarse;