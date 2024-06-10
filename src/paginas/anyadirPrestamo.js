import React, {Fragment, useEffect, useState} from "react";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {useParams} from "react-router-dom";
import { format } from 'date-fns';


function AnyadirPrestamo() {
    let {profesorId, materialId} = useParams();
    const [material, setMaterial] = useState({});
    const [ficheros, setFichero] = useState([]);
    const seleccionarImagenes = e => {setFichero([...e.target.files])}

    useEffect(() => {
        fetch(BASEAPI + "/material/materialid/" + materialId, {method: "GET"})
            .then((response) => response.json())
            .then((result) => {
                setMaterial(result)
            })
            .catch((error) => alert(error));
    }, [materialId]);

    return (
        <Fragment>
            <div className="bg-secondary d-flex flex-column" style={{minHeight: '100vh'}}>
                <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img className="mx-3" src={BASEAPI + "/logotipo.svg"} alt="" width="45" height="45"/>
                            {NOMBREAPP}
                        </a>
                        <a className="navbar-text" href="/" onClick={() => localStorage.clear()}>Cerrar sesión</a>
                    </div>
                </nav>
                <div className="contenedorCuerpo" align="center" style={{marginTop: '15px', marginBottom: '15px'}}>
                    <div className="container contenedorCentral m-3">
                        <div className="row m-2">
                            <p className="fs-1 fw-bold">Crear Préstamo de <u>{material.nombre}</u></p>
                        </div>
                    </div>

                    <div className="col m-2" align="center">
                        <input id={"estadoInicial"} type="text" className="form-control my-3  bg-primary"
                               placeholder="Estado Inicial" style={{width: '700px'}}/>
                        <input id={"utilidad"} type="text" className="form-control my-3  bg-primary"
                               placeholder="Utilidad" style={{width: '700px'}}/>
                        <input id={"unidades"} type="number" min="1" className="form-control my-3  bg-primary"
                               placeholder="Unidades" style={{width: '700px'}}/>
                        <input id={"dniAlumno"} type="text" className="form-control my-3  bg-primary"
                               placeholder="Dni del alumno a prestar" style={{width: '700px'}}/>
                        <input id={"fileinput"} className={"form-control my-3 bg-primary"} type={"file"} multiple
                               style={{width: '700px'}} onChange={seleccionarImagenes}/>
                    </div>


                    <button className="btn btn-primary my-3" style={{width: '700px'}} onClick={() => {
                        const estadoInicial = document.getElementById("estadoInicial").value;
                        const utilidad = document.getElementById("utilidad").value;
                        const unidades = document.getElementById("unidades").value;
                        const dniAlumno = document.getElementById("dniAlumno").value;

                        const fechaActual = format(new Date(), 'yyyy-MM-dd');

                        const formData = new FormData();
                        formData.append("estadoInicial", estadoInicial);
                        formData.append("fechaInicio", fechaActual);
                        formData.append("utilidad", utilidad);
                        formData.append("unidades", unidades);
                        formData.append("materialId", materialId);
                        formData.append("dniAlumno", dniAlumno);
                        formData.append("dniProfesor", profesorId);

                        ficheros.forEach(file => {
                            formData.append('images', file);
                        });

                        fetch(BASEAPI + `/prestamo`, {
                            method: "POST",
                            body: formData,
                        })
                            .then(response => {
                                if (!response.ok) {
                                    return response.text().then(text => {
                                        throw new Error(text);
                                    });
                                }
                                return response.text();
                            })
                            .then(res => {
                                console.log(res);
                                alert(res);
                            })
                            .catch(err => {
                                alert(err.message);
                            });

                        document.getElementById("fileinput").value = null;
                        setFichero(null)
                    }}>Crear préstamo
                    </button>
                </div>
                <nav className="BarraInferior navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom p-0">
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

export default AnyadirPrestamo;