import React, {Fragment, useEffect, useState} from "react";
import localeText, {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {useNavigate, useParams} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import {format} from "date-fns";


function VerPrestamos() {
    let {usuarioId, tipoUsuario} = useParams();
    const [prestamos, setPrestamos] = useState([]);
    const navigate = useNavigate();

    const columnasTabla = [
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'nombre', headerName: 'Nombre', width: 140},
        {field: 'apellidos', headerName: 'Apellidos', width: 140},
        {field: 'estado_inicial', headerName: 'Estado Inicial', width: 140},
        {field: 'fecha_inicio', headerName: 'Fecha de inicio', width: 120, renderCell: (params) => {
                const fechaFormateada = format(new Date(params.value), "yyyy-MM-dd");

                return (
                    <span style={{color: 'black'/*No hay otra manera de cambiar los estilos*/}}>
                    {fechaFormateada}
                </span>
                );
            }},
        {field: 'fecha_devolucion', headerName: 'Fecha de devolución', width: 120, renderCell: (params) => {
                const fechaFormateada = format(new Date(params.value), "yyyy-MM-dd");

                return (
                    <span style={{color: 'black'/*No hay otra manera de cambiar los estilos*/}}>
                    {fechaFormateada}
                </span>
                );
            }},
        {field: 'unidades', headerName: 'Unidades', type: 'number', width: 90},
        {
            field: 'devuelto', headerName: 'Devuelto', width: 90, renderCell: (params) => {
                const devuelto = parseInt(params.value);


                let devueltoFormateado = "No"
                if (devuelto === 1) {
                    devueltoFormateado = "Si"
                }
                return (
                    <span style={{color: 'black'/*No hay otra manera de cambiar los estilos*/}}>
                    {devueltoFormateado}
                </span>
                );
            }
        }
    ];

    useEffect(() => {
        fetch(BASEAPI + `/prestamos/${tipoUsuario}/${usuarioId}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((result) => {
                setPrestamos(result);
                console.log(result)
            })
            .catch((error) => console.error(error));
    }, []);

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
                    <div className="contenedor-interior d-flex justify-content-center align-items-center">
                        <div className="mt-5" style={{width: '90%', height: '35%'}}>
                            {prestamos.length === 0 ? <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">No hay materiales disponibles</h5>
                                        <p className="card-text">Pulsa en "Crear nuevo material y crea uno!! :D"</p>
                                    </div>
                                </div> : crearDatagrid(prestamos, columnasTabla)
                                }
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

function crearDatagrid(prestamos, columnasTabla) {

    const getRowStyle = (params) => {
        if (params.row.devuelto === 1) {
            console.log("SIIII")
            return { backgroundColor: 'blue'};
        }
        console.log("NOOO")
        return {backgroundColor: ''};
    };


    return(
        <DataGrid
            rows={prestamos}
            columns={columnasTabla}
            pageSize={5}
            getRowClassName={(params) => {

                if (params.row.devuelto === 0 && params.row.fecha_inicio >= params.row.fecha_devolucion ) {
                    console.log("SIIII")

                    return  "noDevueltoATiempo";
                }

                if (params.row.devuelto === 0  && params.row.fecha_inicio < params.row.fecha_devolucion) {
                    return  "noDevueltoTodavia";
                }

                if (params.row.devuelto === 1  && params.row.fecha_inicio < params.row.fecha_devolucion) {
                    return  "DevueltoATiempo";
                }

                if (params.row.devuelto === 1 && params.row.fecha_inicio >= params.row.fecha_devolucion ) {
                    console.log("SIIII")

                    return  "DevueltoTarde";
                }




            }}
            onCellDoubleClick={(params) => {
                console.log(params.row)
            }}
            localeText={localeText}
            sx={{
                ".noDevueltoATiempo": {
                    bgcolor: "red",
                },
                ".noDevueltoTodavia": {
                    bgcolor: "",
                },
                ".DevueltoATiempo": {
                    bgcolor: "wheat",
                },
                ".DevueltoTarde": {
                    bgcolor: "brown",
                },
            }}
        />
    )
}

export default VerPrestamos;