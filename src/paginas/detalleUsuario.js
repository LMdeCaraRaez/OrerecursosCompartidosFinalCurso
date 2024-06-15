import React, {Fragment, useEffect, useState} from "react";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {useParams} from "react-router-dom";

function DetalleUsuario() {
    const [usuario, setUsuario] = useState({});
    const [image, setImage] = useState("");
    const {usuarioId, tipoUsuario} = useParams();

    useEffect(() => {
        fetchUsuario();
    }, []);

    useEffect(() => {
        if (usuario.imagenId) {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch(BASEAPI + `/images/get/${usuario.imagenId}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    setImage(result);
                })
                .catch((error) => console.error(error));
        } else {
            setImage("userplaceholder.svg");
        }
    }, [usuario]);

    const fetchUsuario = () => {
        if (tipoUsuario === "profesor" || tipoUsuario === "alumno") {
            fetch(BASEAPI + "/detalleusuario/" + tipoUsuario + "/" + usuarioId, {
                method: "GET"
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    setUsuario(result);
                })
                .catch((error) => console.error(error));
        }
    };

    return (
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
                    <div className="card m-5 p-3" style={{width: '80%'}}>
                        <div className="row">
                            <div className="col-md-8">
                                <h3 className="card-title">
                                    {usuario.nombre} {usuario.apellidos}
                                </h3>
                                <div className="card-body">
                                    <p className="card-text"><strong>DNI: </strong>{usuario.dni}</p>
                                    <p className="card-text"><strong>Correo: </strong>{usuario.correo_electronico}</p>
                                    <p className="card-text"><strong>Número de préstamos: </strong>{usuario.prestamos}
                                    </p>
                                    <p className="card-text"><strong>Fecha de
                                        nacimiento: </strong>{usuario.fecha_nacimiento}</p>
                                    <p className="card-text">
                                        <strong>Validado: </strong>{usuario.validado === 1 ? "Si" : "No"}</p>
                                    <p className="card-text">
                                        <strong>Baneado: </strong>{usuario.baneado === 1 ? "Si" : "No"}</p>
                                    <p className="card-text"><strong>Teléfono: </strong>{usuario.telefono}</p>
                                </div>
                            </div>
                            <div className="col d-flex flex-column align-items-center">
                                <img
                                    src={BASEAPI + "/" + image}
                                    className="img my-2 rounded border border-primary border-2"
                                    style={{width: '40%'}}
                                    alt={"imagenPerfil"}
                                />
                                <div className="">
                                    {usuario.baneado === 0 ?
                                        <button className="btn btn-danger bg-red my-3" onClick={() => {

                                            fetch(BASEAPI + "/banear/" + tipoUsuario + "/" + usuarioId, {
                                                method: "POST",
                                            })
                                                .then((response) => response.json())
                                                .then((result) => {
                                                    console.log(result)
                                                    alert(JSON.stringify(result))
                                                })
                                                .catch((error) => console.error(error));

                                            fetchUsuario()
                                        }}> Banear
                                        </button> : <button className="btn bg-primary bg-red my-3" onClick={() => {

                                            fetch(BASEAPI + "/desbanear/" + tipoUsuario + "/" + usuarioId, {
                                                method: "POST",
                                            })
                                                .then((response) => response.json())
                                                .then((result) => {
                                                    console.log(result)
                                                    alert(JSON.stringify(result))
                                                })
                                                .catch((error) => console.error(error));

                                            fetchUsuario()
                                        }}> Desbanear
                                        </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="BarraInferior navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
                    <div className="container">
                        <p className="navbar-text m-0" style={{textAlign: "center", width: "100%", fontSize: 14}}>
                            Luis Miguel de Cara Ráez - IES Oretania
                        </p>
                    </div>
                </nav>
            </div>
        </Fragment>
    );
}

export default DetalleUsuario;
