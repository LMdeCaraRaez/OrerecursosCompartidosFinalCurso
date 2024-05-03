import React, {Fragment} from "react";

function Home() {
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
            <div className="contenedorCuerpo fixed-center">
                <div className="containerBottones m-5">
                    <div className="card p-3">
                        <div className="row m-3" align="center">
                            <p className="text fs-1">Iniciar sesión</p>
                            <input type="text" className="form-control my-3" placeholder="Correo electrónico"/>
                            <input type="password" className="form-control my-3" placeholder="Contraseña"/>
                            <button type="button"  onClick={ () =>
                                window.location.href = "/registrarse"
                            } className="btn btn-outline-primary">Aceptar
                            </button>
                        </div>
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
    )
}

export default Home;