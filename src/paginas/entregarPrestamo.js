import React, {Fragment, useEffect, useState} from "react";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {useParams} from "react-router-dom";
import {format} from "date-fns";


function EntregarPrestamo(){

    const [prestamo, setPrestamo] = useState({});
    let {prestamoId} = useParams()
    const [ficheros, setFichero] = useState([]);
    const seleccionarImagenes = e => {setFichero([...e.target.files])}

    useEffect(() => {

        fetch(BASEAPI + "/prestamos/" + prestamoId, {method: "GET"})
            .then((response) => response.json())
            .then((result) => {
                setPrestamo(result)
                console.log(result)
            })
            .catch((error) => alert(error));
    }, [prestamoId]);


    return(
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

                    <div className="col m-2" align="center">
                        <h3 className="my-5">
                            Entregar {prestamo.nombreMaterial}
                        </h3>

                        <input id={"estadoFinal"} type="text" className="form-control my-3  bg-primary"
                               placeholder="Estado Final" style={{width: '700px'}}/>
                        <input id={"fileinput"} className={"form-control my-3 bg-primary"} type={"file"} multiple
                               style={{width: '700px'}} onChange={seleccionarImagenes}/>


                        <button className="btn btn-primary my-3" style={{width: '700px'}} onClick={() => {
                            const estadoFinal = document.getElementById("estadoFinal").value;
                            const fechaEntrega = format(new Date(), 'yyyy-MM-dd');


                            const formData = new FormData();
                            formData.append("estadoFinal", estadoFinal);
                            formData.append("fechaEntrega", fechaEntrega);
                            formData.append("prestamoId", prestamoId);

                            ficheros.forEach(file => {
                                formData.append('images', file);
                            });

                            fetch(BASEAPI + `/prestamo`, {
                                method: "PUT",
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
                        }}>Entregar préstamo
                        </button>
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

export default EntregarPrestamo;