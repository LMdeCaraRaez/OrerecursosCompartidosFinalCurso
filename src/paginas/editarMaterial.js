import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";

function EditarMaterial() {

    let {articuloId} = useParams();
    const [material, setMaterial] = useState({});
    const [fichero, setFichero] = useState(null);


    useEffect(() => {

        fetch(BASEAPI + "/material/materialid/" + articuloId, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((result) => {
                setMaterial(result)
            })
            .catch((error) => console.error(error));
    }, [articuloId]);

    const seleccionarImagen = e => {
        setFichero(e.target.files[0]);
    }

    const editarMaterial = (nombre, estado, descripcion, ubicacion, precio) => {
        if (!fichero) {
            alert("Debes de subir un archivo");
            return
        }

        console.log(nombre, estado, descripcion, ubicacion, precio);

        const formData = new FormData();
        formData.append("image", fichero);
        formData.append("nombre", nombre);
        formData.append("estado", estado);
        formData.append("descripcion", descripcion);
        formData.append("ubicacion", ubicacion);
        formData.append("precio", precio);


        fetch(BASEAPI + `/material/${articuloId}`, {
            method: "PUT",
            body: formData,
        }).then(res => res.text()
            .then(res => console.log(res))
            .catch(err => console.error(err)))

        document.getElementById("fileinput").value = null;

        setFichero(null)
    }

    return(
        <Fragment>
            <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img className="mx-3" src={BASEAPI + "/logotipo.svg"} alt="" width={"45"} height={"45"}/>
                        {NOMBREAPP}
                    </a>
                    <a className="navbar-text" href="/" onClick={() => localStorage.clear()}>Cerrar sesión</a>
                </div>
            </nav>
            <div className="bg-secondary d-flex flex-column" style={{minHeight: '100vh'}}>
                <div className="contenedorCuerpo" align="center" style={{marginTop: '15px', marginBottom: '15px'}}>
                    <div className="container contenedorCentral m-3">
                        <div className="row m-2">
                            <p className="fs-1 fw-bold">Se está editando {material.nombre}</p>
                        </div>

                        <div className="col m-2" align="center">
                            <input id={"nombre"} type="text" className="form-control my-3  bg-primary"
                                   placeholder="Nombre" defaultValue={material.nombre}
                                   style={{width: '700px'}}/>
                            <input id={"estado"} type="text" className="form-control my-3  bg-primary"
                                   placeholder="Estado" defaultValue={material.estado}
                                   style={{width: '700px'}}/>
                            <input id={"descripcion"} type="text" className="form-control my-3 bg-primary"
                                   placeholder="Descripción" defaultValue={material.descripcion}
                                   style={{width: '700px'}}/>
                            <input id={"ubicacion"} type="text" className="form-control my-3 bg-primary"
                                   placeholder="Ubicación" defaultValue={material.ubicacion}
                                   style={{width: '700px'}}/>
                            <div className="input-group mb-3" style={{width: '700px'}}>
                                <input id={"precio"} type="text" className="form-control my-3 bg-primary"
                                       placeholder="Precio" defaultValue={material.precio}/>
                                <span className="input-group-text my-3" id="basic-addon2">€</span>
                            </div>

                            <input id={"fileinput"} className={"form-control my-3 bg-primary"} type={"file"}
                                   style={{width: '700px'}} onChange={seleccionarImagen}/>

                            <button className="btn btn-primary my-3" style={{width: '700px'}} onClick={() => {
                                const nombre = document.getElementById("nombre").value;
                                const estado = document.getElementById("estado").value;
                                const descripcion = document.getElementById("descripcion").value;
                                const ubicacion = document.getElementById("ubicacion").value;
                                const precio = document.getElementById("precio").value;

                                editarMaterial(nombre, estado, descripcion, ubicacion, precio)


                            }}>Enviar
                                Aceptar edición
                            </button>
                            <div className="mb-5"/>
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
        </Fragment>
    )
}


export default EditarMaterial;