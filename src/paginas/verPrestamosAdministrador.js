import React, {Fragment, useEffect, useState} from "react";
import localeText, {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";


function VerPrestamosAdministrador() {
    const navigate = useNavigate();
    const [prestamos, setPrestamos] = useState([]);

    const fetchPrestamos = () => {
        fetch(BASEAPI + "/prestamos", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setPrestamos(result)
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchPrestamos()
    }, []);
    


    const columnasTabla = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'profesor', headerName: 'Profesor', width: 170, renderCell: (params) => {
                return (
                    <span>
                        {params.row.profesorNombre} {params.row.profesorApellidos}
                    </span>
                )
            }
        },
        {
            field: 'alumno', headerName: 'Alumno', width: 170, renderCell: (params) => {
                return (
                    <span>
                        {params.row.alumnoNombre} {params.row.alumnoApellidos}
                    </span>
                )
            }
        },
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
                    <span style={{color: 'black'}}>
                    {fechaFormateada}
                </span>
                );
            }
        },
        {field: 'unidades', headerName: 'Unidades', type: 'number', width: 90}
    ];


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
                    className="contenedorCuerpo mt-5 bg-secondary d-flex flex-column justify-content-center align-items-center">
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
                            navigate("/detalle/prestamo/" + params.row.id + "/admin")
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
                        style={{marginBottom: "70px"}}
                    />
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

export default VerPrestamosAdministrador