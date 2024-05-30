import React, { Fragment, useEffect, useState } from "react";
import { BASEAPI, NOMBREAPP } from "../modelos/constantes";
import { useNavigate } from "react-router-dom";

function VerMateriales() {
    const [materiales, setMateriales] = useState([]);
    const [imagenes, setImagenes] = useState({}); // Array de las imagenes que añado en setImagenes imagenes
    const localStorageDni = JSON.parse(localStorage.getItem("dni"));
    const navigate = useNavigate();

    // Use effect que carga los datos del usuario
    useEffect(() => {
        fetch(BASEAPI + `/material/${localStorageDni}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((result) => {
                setMateriales(result);
                result.forEach(material => {
                    if (material.imagenId) {
                        buscarImagen(material.imagenId);
                    }
                });
            })
            .catch((error) => console.error(error));
    }, [localStorageDni]);

    function buscarImagen(imagenId) {
        fetch(BASEAPI + `/images/get/${imagenId}`, {
            method: "GET"
        }).then((response) => response.text())
            .then((result) => {
                //
                setImagenes(prevState => ({
                    // Copia todas las imagenes que ya estaban y añade la nueva del resultado
                    ...prevState,
                    [imagenId]: result
                }));
            })
            .catch((error) => console.error(error));
    }

    return (
        <Fragment>
            <div className="bg-secondary d-flex flex-column" style={{ minHeight: '100vh' }}>
                <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img className="mx-3" src={BASEAPI + "/logotipo.svg"} alt="" width="45" height="45" />
                            {NOMBREAPP}
                        </a>
                    </div>
                </nav>
                <div className="contenedor-interior d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary mt-3 px-5 py-4" onClick={() => navigate("/crear/articulos")}>
                        <p>Crear un nuevo objeto</p>
                        <img className="" src={BASEAPI + `/crear.svg`} alt="" width="45" height="45" />
                    </button>
                </div>
                <div className="my-4 w-100 d-flex flex-column justify-content-center align-items-center">
                    {
                        materiales.length > 0 ? (
                            materiales.map((material, i) => (
                                <div key={i}>
                                    <div className="card m-2 bg-primary" style={{ width: '500px' }}>
                                        {
                                            material.imagenId && imagenes[material.imagenId] ? (
                                                <img src={BASEAPI + "/" + imagenes[material.imagenId]} className="card-img-top img-fluid" style={{ maxHeight: '200px' }} alt="..." />
                                            ) : (
                                                <img src={BASEAPI + "/logotipo.svg"} className="card-img-top img-fluid" style={{ maxHeight: '200px' }} alt="..." />
                                            )
                                        }
                                        <div className="card-body">
                                            <h5 className="card-title mb-3"><strong>{material.nombre}</strong></h5>
                                            <div className="border-bottom mb-3 bg-dark"></div>
                                            <p className="card-text"><strong>Estado:</strong>  {material.estado}</p>
                                            <p className="card-text"><strong>Ubicación:</strong> {material.ubicacion}</p>
                                            <p className="card-text"><strong>Precio:</strong> {material.precio}€</p>
                                            <button className="btn btn-secondary" style={{width: '100%'}}>Editar Material</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : <div/>
                    }
                    <div className="mb-5" />
                </div>
                <nav className="BarraInferior navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom p-0">
                    <div className="container">
                        <p className="navbar-text m-0" style={{ textAlign: "center", width: "100%", fontSize: 14 }}>Luis
                            Miguel de Cara Ráez - IES Oretania</p>
                    </div>
                </nav>
            </div>
        </Fragment>
    );
}

export default VerMateriales;
