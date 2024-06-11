import React, {Fragment, useState} from "react";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {useNavigate} from "react-router-dom";

function CrearMaterial() {

    const usuarioId = JSON.parse(localStorage.getItem("dni"));

    const [image, setImage] = useState("");
    const [fichero, setFichero] = useState(null);
    const navigate = useNavigate();

    const anyadirMaterial = (nombre, estado, descripcion, ubicacion, precio) => {
        if (!fichero) {
            alert("Debes de subir un archivo");
            return
        }

        const formData = new FormData();
        formData.append("image", fichero);
        formData.append("nombre", nombre);
        formData.append("estado", estado);
        formData.append("descripcion", descripcion);
        formData.append("ubicacion", ubicacion);
        formData.append("precio", precio);

        fetch(BASEAPI + `/material/${usuarioId}`, {
            method: "POST",
            body: formData,
        }).then(res => res.text()
            .then(res => {
                console.log(res)
                alert(res)
                navigate("/")
            })
            .catch(err => console.error(err)))

        document.getElementById("fileinput").value = null;

        setFichero(null)
    }

    const seleccionarImagen = e => {
        setFichero(e.target.files[0]);
    }



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
                <div className="contenedorCuerpo" align="center" style={{marginTop: '15px', marginBottom: '15px'}}>
                    <div className="container contenedorCentral m-3">
                        <div className="row m-2">
                            <p className="fs-1 fw-bold">Añadir un nuevo material</p>
                        </div>

                        <div className="col m-2" align="center">
                            <input id={"nombre"} type="text" className="form-control my-3  bg-primary"
                                   placeholder="Nombre"
                                   style={{width: '700px'}}/>
                            <input id={"estado"} type="text" className="form-control my-3  bg-primary"
                                   placeholder="Estado"
                                   style={{width: '700px'}}/>
                            <input id={"descripcion"} type="text" className="form-control my-3 bg-primary"
                                   placeholder="Descripción"
                                   style={{width: '700px'}}/>
                            <input id={"ubicacion"} type="text" className="form-control my-3 bg-primary"
                                   placeholder="Ubicación"
                                   style={{width: '700px'}}/>
                            <div className="input-group mb-3" style={{width: '700px'}}>
                                <input id={"precio"} type="text" className="form-control my-3 bg-primary"
                                       placeholder="Precio"/>
                                <span className="input-group-text my-3" id="basic-addon2">€</span>
                            </div>

                            <input id={"fileinput"} onChange={seleccionarImagen}
                                   className={"form-control my-3 bg-primary"} type={"file"} style={{width: '700px'}}/>


                            <button className="btn btn-primary my-3" style={{width: '700px'}} onClick={() => {
                                const nombre = document.getElementById("nombre").value;
                                const estado = document.getElementById("estado").value;
                                const descripcion = document.getElementById("descripcion").value;
                                const ubicacion = document.getElementById("ubicacion").value;
                                const precio = document.getElementById("precio").value;


                                anyadirMaterial(nombre, estado, descripcion, ubicacion, precio)


                            }}>Enviar
                                Añadir material
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

export default CrearMaterial;
