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
        {field: 'nombre', headerName: 'nombre', width: 140},
        {field: 'apellidos', headerName: 'Apellidos', width: 140},
        {field: 'nombreMaterial', headerName: 'Nombre del material', width: 140},
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
        },
        {field: 'estado_inicial', headerName: 'Estado Inicial', width: 140},
        {
            field: 'fecha_inicio', headerName: 'Fecha de inicio', width: 120, renderCell: (params) => {
                const fechaFormateada = format(new Date(params.value), "yyyy-MM-dd");

                return (
                    <span style={{color: 'black'/*No hay otra manera de cambiar los estilos*/}}>
                    {fechaFormateada}
                </span>
                );
            }
        },
        {
            field: 'fecha_devolucion', headerName: 'Fecha de devolución', width: 160, renderCell: (params) => {
                const fecha = params.value

                if (!fecha) {
                    return (
                        <span style={{color: 'black'/*No hay otra manera de cambiar los estilos*/}}>
                             {"No hay, no devuelto"}
                         </span>
                    )
                }
                const fechaFormateada = format(new Date(params.value), "yyyy-MM-dd");

                return (
                    <span style={{color: 'black'/*No hay otra manera de cambiar los estilos*/}}>
                    {fechaFormateada}
                </span>
                );
            }
        },
        {field: 'unidades', headerName: 'Unidades', type: 'number', width: 90}
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
                                    <h5 className="card-title">No hay préstamos disponibles</h5>
                                    <p className="card-text">Pide a algun profesor que te preste algún material</p>
                                </div>
                            </div> : crearDatagrid(prestamos, columnasTabla, navigate, tipoUsuario)
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

function crearDatagrid(prestamos, columnasTabla, navigate, tipoUsuario) {

    return (
        <DataGrid
            rows={prestamos}
            columns={columnasTabla}

            pageSize={5}
            getRowClassName={(params) => {

                if (params.row.devuelto === 0) {
                    return "noDevuelto";
                }


                if (params.row.devuelto === 1) {

                    return "Devuelto";
                }


            }}
            onCellDoubleClick={(params) => {
                console.log(params.row)
                navigate("/detalle/prestamo/" + params.row.id + "/" + tipoUsuario)

            }}
            localeText={localeText}
            sx={{
                ".noDevuelto": {
                    bgcolor: "red",
                },
                ".Devuelto": {
                    bgcolor: "green",
                },
            }}
        />
    )
}

export default VerPrestamos;