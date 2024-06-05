import React, {Fragment, useEffect, useState} from "react";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {useParams} from "react-router-dom";


function AnyadirPrestamo() {
    let {profesorId} = useParams();
    const [materiales, setMateriales] = useState([]);


    useEffect(() => {
        fetch(BASEAPI + `/material/usuario/${profesorId}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(profesorId);
                setMateriales(result);
                console.log(result)
            })
            .catch((error) => console.error(error));
    }, [profesorId]);

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
                            <p className="fs-1 fw-bold">Crear Préstamo</p>
                        </div>
                    </div>

                    <div className="col m-2" align="center">
                        <input id={"estadoInicial"} type="text" className="form-control my-3  bg-primary" placeholder="Estado Inicial" style={{width: '700px'}}/>
                        <input id={"fechaDevolucion"} type="date" className="form-control my-3  bg-primary" placeholder="Fecha de devolucion" style={{width: '700px'}}/>
                        <input id={"utilidad"} type="text" className="form-control my-3  bg-primary" placeholder="Utilidad" style={{width: '700px'}}/>
                        <input id={"unidades"} type="number" min="1" className="form-control my-3  bg-primary" placeholder="Unidades" style={{width: '700px'}}/>
                        <input id={"material"} type="text" className="form-control my-3  bg-primary" placeholder="Material?" style={{width: '700px'}}/>
                        <input id={"dniAlumno"} type="text" className="form-control my-3  bg-primary" placeholder="Dni del alumno" style={{width: '700px'}}/>
                        {materiales[0].nombre}
                    </div>
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