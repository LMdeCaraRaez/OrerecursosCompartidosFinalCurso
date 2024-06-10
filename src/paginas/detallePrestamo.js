import React, {Fragment, useEffect, useState} from "react";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {useParams} from "react-router-dom";


function DetallePrestamo() {

    let {prestamoId} = useParams();

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
                                    <p className="card-text"><strong>Fecha inicio préstamo: </strong>{prestamo.fecha_inicio}</p>
                                    <p className="card-text"><strong>Fecha devolución préstamo: </strong>{prestamo.fecha_devolucion ? prestamo.fecha_devolucion : "No se ha entregado todavía"}</p>
                                </div>
                            </div>
                            <div className="col d-flex flex-column align-items-center">

                                <h3>Imagenes Iniciales</h3>
                                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {imagenes.imagenesIniciales && imagenes.imagenesIniciales.map((imagen, index) => (
                                            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                <img src={BASEAPI + "/" + imagen} className="d-block w-100" alt={""} style={{width:'100%', height:'200px', objectFit:'cover'}} />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button"
                                            data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>

                                <h3>Imagenes de entrega</h3>
                                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {imagenes.imagenesFinales && imagenes.imagenesFinales.map((imagen, index) => (
                                            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                <img src={BASEAPI + "/" + imagen} className="d-block w-100" alt={""} style={{width:'100%', height:'200px', objectFit:'cover'}} />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button"
                                            data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                        <button className="btn btn-primary mt-3" style={{width: "20%"}}>Crear préstamo
                        </button>
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