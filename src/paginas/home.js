import React, {Fragment, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";

function Home() {
    const navigate = useNavigate();
    const [tipoUsuario, setTipoUsuario] = useState("Tipo de usuario");

    useEffect(() => {
        const localStorageDni = localStorage.getItem("dni");
        const localStorageContrasenya = localStorage.getItem("contrasenya");
        const localStorageTipoUsuario = localStorage.getItem("tipousuario");

        if (localStorageDni !== null && localStorageContrasenya !== null && localStorageTipoUsuario !== null) {
            navigate('/bienvenida');
        }
    }, []);



    return (
        <Fragment>
            <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img className="mx-3" src={BASEAPI + "/logotipo.svg"} alt="" width="45" height="45"/>
                        {NOMBREAPP}
                    </a>
                    <a className="navbar-text" href="/registrarse">Registrarte</a>
                </div>
            </nav>
            <div className="contenedorCuerpo fixed-center">
                <div className="containerBottones m-5">
                    <div className="card p-3">
                        <div className="row m-3" align="center">
                            <p className="text fs-1">Iniciar sesión</p>
                            <div className="dropdown pb-2">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    {tipoUsuario}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item"
                                           onClick={() => {
                                               setTipoUsuario("Profesor")
                                           }}>Profesor</a></li>
                                    <li><a className="dropdown-item"
                                           onClick={() => {
                                               setTipoUsuario("Alumno")
                                           }}>Alumno</a>
                                    </li>
                                </ul>
                            </div>

                            <input id={"correo"} type="text" className="form-control my-3"
                                   placeholder="Correo electrónico"/>
                            <input id={"contrasenya"} type="password" className="form-control my-3"
                                   placeholder="Contraseña"/>
                            <button type="button" onClick={() => {

                                const correo = document.getElementById("correo").value;
                                const contrasenya = document.getElementById("contrasenya").value;

                                if (correo === "" || contrasenya === "") {
                                    alert("Debe rellenar todos los campos");
                                } else {

                                    const myHeaders = new Headers();
                                    myHeaders.append("Content-Type", "application/json");

                                    if (tipoUsuario === "Profesor") {

                                        fetch(BASEAPI + `/profesor/existe/${correo}/${contrasenya}`, {
                                            method: "GET",
                                            headers: myHeaders,
                                        }).then(response => {
                                            if (!response.ok) {
                                                throw new Error('Error al enviar los parámetros de la llamada' + response);
                                            }
                                            return response.json();
                                        })
                                            .then(data => {
                                                const usuario = data
                                                console.log(data)
                                                if (data.validado === 1) {
                                                    localStorage.setItem("dni", JSON.stringify(usuario.dni));
                                                    localStorage.setItem("contrasenya", JSON.stringify(usuario.contrasenya));
                                                    localStorage.setItem("tipousuario", JSON.stringify("profesor"));

                                                    navigate('/bienvenida');
                                                } else {
                                                    alert("Debes validar tu correo para iniciar sesión!!!")
                                                }


                                            })
                                            .catch(error => {
                                                alert(error);
                                            });


                                    } else if (tipoUsuario === "Alumno") {

                                        fetch(BASEAPI + `/alumno/existe/${correo}/${contrasenya}`, {
                                            method: "GET",
                                            headers: myHeaders,
                                        }).then(response => {
                                            if (!response.ok) {
                                                throw new Error('Error al enviar los parámetros de la llamada' + response);
                                            }
                                            return response.json();
                                        })
                                            .then(data => {
                                                console.log(data);
                                                if (data.validado === 1) {
                                                    const usuario = data
                                                    localStorage.setItem("dni", JSON.stringify(usuario.dni));
                                                    localStorage.setItem("contrasenya", JSON.stringify(usuario.contrasenya));
                                                    localStorage.setItem("tipousuario", JSON.stringify("alumno"));

                                                    navigate('/bienvenida');
                                                } else {
                                                    alert("Debes validar tu correo para iniciar sesión!!!")
                                                }


                                            })
                                            .catch(error => {
                                                alert(error);
                                            });

                                    } else {
                                        alert("Selecciona un tipo de usuario");
                                    }
                                }
                            }
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