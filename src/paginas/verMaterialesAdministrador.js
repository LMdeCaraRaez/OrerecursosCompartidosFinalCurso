import React, {Fragment, useEffect, useState} from "react";
import localeText, {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {useNavigate} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";


function VerMaterialesAdministrador() {
    const navigate = useNavigate();
    const [materiales, setMateriales] = useState([]);

    const fetchMateriales = () => {
        fetch(BASEAPI + "/materiales", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setMateriales(result)
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchMateriales()
    }, []);

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
            }},
        { field: 'estaSiendoPrestado', headerName: 'Prestado',type: "boolean",  width: 190}
    ];
    
    
    
    return(
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

                <div className="my-4 w-100 d-flex flex-column justify-content-center align-items-center">
                    {materiales.length === 0 ? (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">No hay materiales disponibles</h5>
                                <p className="card-text">Pulsa en "Crear nuevo material y crea uno!! :D"</p>
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            width: '85%',
                            height: '35%'
                        }}>
                            <DataGrid
                                rows={materiales}
                                columns={columnasTabla}
                                pageSize={5}
                                onCellDoubleClick={(params) => {
                                    console.log('Se ha hecho doble click en la celda: ', params);
                                    navigate("/detalle/articulo/" + params.row.id + "/admin")
                                }}
                                localeText={localeText}
                                getRowClassName={(params) => {

                                    if (params.row.estaSiendoPrestado === false) {
                                        return "noprestado";
                                    } else if (params.row.estaSiendoPrestado === true) {
                                        return "prestado";
                                    }
                                }}
                                sx={{
                                    ".prestado": {
                                        bgcolor: "red",
                                    },
                                    ".noprestado": {
                                        bgcolor: "green",
                                    },
                                }}
                            />
                        </div>
                    )}
                    <div className="mb-5"/>
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

export default VerMaterialesAdministrador;