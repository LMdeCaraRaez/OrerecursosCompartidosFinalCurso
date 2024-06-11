import localeText from "../modelos/constantes"
import React, { Fragment, useEffect, useState } from "react";
import {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import { useNavigate } from "react-router-dom";
import {DataGrid} from '@mui/x-data-grid';


function VerMateriales() {
    const [materiales, setMateriales] = useState([]);
    const localStorageDni = JSON.parse(localStorage.getItem("dni"));
    const navigate = useNavigate();
    const [filasTabla, setFilasTabla] = React.useState([]);

    const columnasTabla = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'nombre', headerName: 'Nombre', width: 190 },
        { field: 'estado', headerName: 'Estado', width: 190 },
        { field: 'descripcion', headerName: 'Descripción', width: 250 },
        { field: 'ubicacion', headerName: 'Ubicación', width: 190},
        { field: 'precio', headerName: 'Precio', type: 'number', width: 110, renderCell: (params) => {
                const precio = parseFloat(params.value);
                return (
                    <span>
                    {precio + "€"}
                </span>
                );
            }}
    ];

    // Use effect que carga los datos del usuario
    useEffect(() => {
        fetch(BASEAPI + `/material/usuario/${localStorageDni}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((result) => {
                setMateriales(result);
                setFilasTabla(result);
            })
            .catch((error) => console.error(error));
    }, [localStorageDni]);

    return (
        <Fragment>
            <div className="bg-secondary d-flex flex-column" style={{ minHeight: '100vh' }}>
                <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img className="mx-3" src={BASEAPI + "/logotipo.svg"} alt="" width="45" height="45"/>
                            {NOMBREAPP}
                        </a>
                        <a className="navbar-text" href="/" onClick={() => localStorage.clear()}>Cerrar sesión</a>
                    </div>
                </nav>
                <div className="contenedor-interior d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary mt-3 px-5 py-4" onClick={() => navigate("/crear/articulos")}>
                        <p>Crear un nuevo material</p>
                        <img className="" src={BASEAPI + `/crear.svg`} alt="" width="45" height="45" />
                    </button>
                </div>
                <div className="my-4 w-100 d-flex flex-column justify-content-center align-items-center">
                    {materiales.length === 0 ? (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">No hay materiales disponibles</h5>
                                <p className="card-text">Pulsa en "Crear nuevo material y crea uno!! :D"</p>
                            </div>
                        </div>
                    ) : (
                        <div style={{width: '85%', height: '35%'}}> {/*Defino una altura y anchura mínimas por pantalla*/}
                            <DataGrid
                                rows={filasTabla}
                                columns={columnasTabla}
                                pageSize={5}
                                onCellDoubleClick={(params) => {
                                    console.log('Se ha hecho doble click en la celda: ', params);
                                    navigate("/detalle/articulo/" + params.row.id)
                                }}
                                localeText={localeText}
                            />
                        </div>
                    )}
                    <div className="mb-5"/>
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
