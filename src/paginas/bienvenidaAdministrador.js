import React, {Fragment, useEffect, useState} from "react";
import {BASEAPI} from "../modelos/constantes";
import {useNavigate} from "react-router-dom";


function BienvenidaAdministrador() {

    const localStorageDni = JSON.parse(localStorage.getItem("dni"));
    const localStorageContrasenya = JSON.parse(localStorage.getItem("contrasenya"));
    const navigate = useNavigate();
    const [datosAdministrador, setDatosAdministrador] = useState({});

    useEffect(() => {


        if (!(localStorageDni !== null && localStorageContrasenya !== null)) {
            navigate('/');
        } else {
            fetch(BASEAPI + "/administrador/existe/" + localStorageDni + "/" + localStorageContrasenya, {
                method: "GET"
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    setDatosAdministrador(result)
                })
                .catch((error) => console.error(error));
        }
    }, []);


    return (
        <Fragment>
            <div className="bg-secondary d-flex flex-column" style={{minHeight: '100vh'}}>
                <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img className="mx-3" src={BASEAPI + "/logotipo.svg"} alt="" width={"45"} height={"45"}/>
                            Bienvenido {datosAdministrador.nombre}
                        </a>
                        <a className="navbar-text" href="/" onClick={() => localStorage.clear()}>Cerrar sesión</a>
                    </div>
                </nav>

                <h1 className="text-center mt-5">Ventana de administrador</h1>
                <div className="col d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary mx-4" style={{width: '20%'}} onClick={
                        () => navigate("/ver/prestamos/admin")}>
                        <div className="row p-2">
                            <p>Ver Prestamos</p>
                            <img className="" src={BASEAPI + "/lista.svg"} alt="" width="45" height="45"/>
                        </div>
                    </button>

                    <button className="btn btn-primary mx-4" style={{width: '20%'}} onClick={
                        () => navigate("/ver/materiales/admin")}>
                        <div className="row p-2">
                            <p>Ver Objetos prestables</p>
                            <img className="" src={BASEAPI + "/subir.svg"} alt="" width="45" height="45"/>
                        </div>
                    </button>

                    <button className="btn btn-primary mx-4" style={{width: '20%'}} onClick={
                        () => navigate("/ver/usuarios/admin")}>
                        <div className="row p-2">
                            <p>Ver Usuarios</p>
                            <img className="" src={BASEAPI + "/subir.svg"} alt="" width="45" height="45"/>
                        </div>
                    </button>

                </div>

                <nav className="BarraInferior navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
                    <div className="container">
                        <p className="navbar-text m-0" style={{textAlign: "center", width: "100%", fontSize: 14}}>Luis
                            Miguel de Cara Ráez - IES Oretania</p>
                    </div>
                </nav>
            </div>
        </Fragment>
    )
}

export default BienvenidaAdministrador;
