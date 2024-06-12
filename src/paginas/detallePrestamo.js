import React, {Fragment, useEffect, useState} from "react";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {useNavigate, useParams} from "react-router-dom";
import { format } from 'date-fns';
import VistaPDF from "./documentoPdf";
import {pdf} from "@react-pdf/renderer";


function DetallePrestamo() {
    let {prestamoId, tipoUsuario} = useParams();
    const navigate = useNavigate();

    const [prestamo, setPrestamo] = useState({});
    const [imagenes, setImagenes] = useState({});

    useEffect(() => {

        fetch(BASEAPI + "/prestamos/" + prestamoId, {method: "GET"})
            .then((response) => response.json())
            .then((result) => {
                setPrestamo(result)
                console.log(result)
            })
            .catch((error) => alert(error));
    }, [prestamoId]);

    useEffect(() => {

        fetch(BASEAPI + "/prestamosImagenes/" + prestamoId, {method: "GET"})
            .then((response) => response.json())
            .then((result) => {
                setImagenes(result)
                console.log(result)
            })
            .catch((error) => alert(error));
    }, [prestamoId]);



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
                                    Préstamo de: {prestamo.nombreMaterial} x {prestamo.unidades}
                                </h3>
                                <div className="card-body">
                                    <p className="card-text"><strong>Profesor que presta: </strong>{prestamo.profesorNombre + " " + prestamo.profesorApellidos}</p>
                                    <p className="card-text"><strong>Alumno al que es prestado: </strong>{prestamo.alumnoNombre + " " + prestamo.alumnoApellidos}</p>
                                    <p className="card-text"><strong>Estado inicial: </strong>{prestamo.estado_inicial}</p>
                                    <p className="card-text"><strong>Estado final: </strong>{prestamo.estado_final ? prestamo.estado_final : "Todavía no entregado"}</p>
                                    <p className="card-text"><strong>Devuelto: </strong>{prestamo.devuelto === 1 ? <strong style={{color: "green"}}>Devuelto</strong> : <strong style={{color: "red"}}>No devuelto</strong>}</p>
                                    <p className="card-text"><strong>Precio material: </strong>{prestamo.precioMaterial}</p>
                                    <p className="card-text"><strong>Utilidad o proyecto asignado: </strong>{prestamo.utilidad}</p>
                                    <p className="card-text"><strong>Fecha inicio préstamo: </strong>{prestamo.fecha_inicio ? format(new Date(prestamo.fecha_inicio), 'yyyy-MM-dd') : ""}</p>
                                    <p className="card-text"><strong>Fecha devolución préstamo: </strong>{prestamo.fecha_devolucion ? format(new Date(prestamo.fecha_devolucion), 'yyyy-MM-dd') : "No se ha entregado todavía"}</p>
                                </div>
                            </div>
                            <div className="col d-flex flex-column align-items-center">
                                {(imagenes.imagenesIniciales && imagenes.imagenesIniciales.length === 0 && imagenes.imagenesFinales && imagenes.imagenesFinales.length === 0) ? (
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">No hay imágenes</h5>
                                            <p className="card-text">No se encontraron imágenes del préstamo.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {imagenes.imagenesIniciales && imagenes.imagenesIniciales.length > 0 && (
                                            <>
                                                <h3>Imágenes Iniciales</h3>
                                                <div id="carruselInicial" className="carousel slide"
                                                     data-bs-ride="carousel">
                                                    <div className="carousel-inner">
                                                        {imagenes.imagenesIniciales.map((imagen, index) => (
                                                            <div key={index}
                                                                 className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                                <img src={BASEAPI + "/" + imagen}
                                                                     className="d-block w-100" alt="" style={{
                                                                    width: '100%',
                                                                    height: '200px',
                                                                    objectFit: 'cover'
                                                                }}/>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button className="carousel-control-prev" type="button"
                                                            data-bs-target="#carruselInicial" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon"
                                                              aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button"
                                                            data-bs-target="#carruselInicial" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon"
                                                              aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                        {imagenes.imagenesFinales && imagenes.imagenesFinales.length > 0 && (
                                            <>
                                                <h3 className="mt-5">Imágenes de entrega</h3>
                                                <div id="carruselFinal" className="carousel slide"
                                                     data-bs-ride="carousel">
                                                    <div className="carousel-inner">
                                                        {imagenes.imagenesFinales.map((imagen, index) => (
                                                            <div key={index}
                                                                 className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                                <img src={BASEAPI + "/" + imagen}
                                                                     className="d-block w-100" alt="" style={{
                                                                    width: '100%',
                                                                    height: '200px',
                                                                    objectFit: 'cover'
                                                                }}/>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button className="carousel-control-prev" type="button"
                                                            data-bs-target="#carruselFinal" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon"
                                                              aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button"
                                                            data-bs-target="#carruselFinal" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon"
                                                              aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mt-3" style={{ display: "flex", gap: "10px" }}>
                            {tipoUsuario === "alumno" ? (
                                <button className="btn btn-primary" style={{ width: "20%" }} onClick={() => {

                                    if (prestamo.devuelto === 1) {
                                        alert("No puedes entregar un prestamo ya devuelto")
                                    } else {navigate("/entregar/prestamo/" + prestamo.id)}
                                }}>Entregar préstamo</button>
                            ) : null}
                            <button className="btn btn-primary" style={{ width: "20%" }} onClick={ async () => {

                                // Genera el PDF como un blob
                                const blob = await pdf(<VistaPDF datosPrestamo={prestamo}/>).toBlob();
                                // Crea una URL a partir del blob
                                const url = URL.createObjectURL(blob);
                                // Abre la URL en una nueva pestaña
                                window.open(url, "_blank");

                            }
                            }>Imprimir préstamo</button>
                        </div>

                    </div>
                </div>
                <nav className="BarraInferior navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
                    <div className="container">
                        <p className="navbar-text m-0"
                           style={{textAlign: "center", width: "100%", fontSize: 14}}>Luis
                            Miguel de Cara Ráez - IES Oretania</p>
                    </div>
                </nav>
            </div>
        </Fragment>
    )
}

export default DetallePrestamo;