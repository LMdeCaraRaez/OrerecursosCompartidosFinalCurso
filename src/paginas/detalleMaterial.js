import React, {Fragment, useEffect, useState} from "react";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {useNavigate, useParams} from "react-router-dom";


function DetalleMaterial() {
    const [material, setMaterial] = useState({});
    let {articuloId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        fetch(BASEAPI + "/material/materialid/" + articuloId, {method: "GET"})
            .then((response) => response.json())
            .then((result) => {
                setMaterial(result)
            })
            .catch((error) => alert(error));
    }, [articuloId]);

    // Solo uso esta llamada para guardar la imagen en la base de datos en dbimages en caso de q no lo esté
    useEffect(() => {

        fetch(BASEAPI + "/images/get/" + material.imagenId, {method: "GET"})
            .then((response) => response.text())
            .then((result) => {
            })
            .catch((error) => alert(error));
    }, [material]);


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
                                    {material.nombre}
                                </h3>
                                <div className="card-body">
                                    <p className="card-text"><strong>Estado: </strong>{material.estado}</p>
                                    <p className="card-text"><strong>Ubicación: </strong>{material.ubicacion}</p>
                                    <p className="card-text"><strong>Precio: </strong>{material.precio}€</p>
                                    <p className="card-text"><strong>Descripción: </strong>{material.descripcion}</p>
                                </div>
                            </div>
                            <div className="col d-flex flex-column align-items-center">
                                <img src={BASEAPI + "/" + material.imagenId + "-" + material.name} className="img my-2 rounded border border-primary border-2" style={{width:'40%'}}/>
                                <button className="btn btn-primary mt-auto" onClick={() => {
                                    navigate("/editar/articulo/" + articuloId)
                                }}>Editar Material</button>
                            </div>
                        </div>
                    </div>
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

export default DetalleMaterial;