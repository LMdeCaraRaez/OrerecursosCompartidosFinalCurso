import React, {Fragment, useEffect, useState} from "react";
import localeText, {BASEAPI, NOMBREAPP} from "../modelos/constantes";
import {format} from "date-fns";
import {DataGrid} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";


function VerUsuariosAdministrador() {
    const [tipoUsuario, setTipoUsuario] = useState("Profesor");
    const [filasUsuario, setFilasUsuario] = useState([]);
    const navigate = useNavigate();

    const fetchUsuarios = () => {
        fetch(BASEAPI + "/usuarios/" + tipoUsuario.toLowerCase(), {
            method: "GET"
        })
            .then((response) => response.json())
            .then((result) => {
                setFilasUsuario(result);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchUsuarios()
    }, []); // Se ejecuta al inicio




    useEffect(() => {
        fetchUsuarios();
    }, [tipoUsuario]); // Se ejecuta cuando cambia tipoUsuario

    const columnasTabla = [
        { field: 'id', headerName: 'DNI', width: 130 },
        { field: 'correo_electronico', headerName: 'Correo Electrónico', width: 170 },
        { field: 'nombre', headerName: 'Nombre', width: 140 },
        { field: 'apellidos', headerName: 'Apellidos', width: 160 },
        { field: 'fecha_nacimiento', headerName: 'Fecha de Nacimiento', width: 160 , renderCell: (params) => {
                const fechaFormateada = format(new Date(params.value), "yyyy-MM-dd");

                return (
                    <span style={{color: 'black'}}>
                    {fechaFormateada}
                </span>
                );
            }
        },
        { field: 'validado', headerName: 'Validado', type: 'boolean', width: 100 },
        { field: 'baneado', headerName: 'Baneado', type: 'boolean', width: 100 },
        { field: 'telefono', headerName: 'Teléfono', width: 100 }
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

                <div className="contenedorCuerpo mt-5 bg-secondary d-flex flex-column justify-content-center align-items-center">
                    <div className="dropdown pb-2">
                        <button className="btn btn-primary dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Buscando: {tipoUsuario}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item"
                                   onClick={() => {

                                       setTipoUsuario("Profesor")
                                       fetch(BASEAPI + "/usuarios/" + tipoUsuario.toLowerCase(), {
                                           method: "GET"
                                       })
                                           .then((response) => response.json())
                                           .then((result) => {
                                               setFilasUsuario(result)
                                           })
                                           .catch((error) => console.error(error));


                                   }}>Profesor</a></li>
                            <li><a className="dropdown-item"
                                   onClick={() => {

                                       setTipoUsuario("Alumno")
                                       fetch(BASEAPI + "/usuarios/" + tipoUsuario.toLowerCase(), {
                                           method: "GET"
                                       })
                                           .then((response) => response.json())
                                           .then((result) => {
                                               setFilasUsuario(result)
                                           })
                                           .catch((error) => console.error(error));


                                   }}>Alumno</a>
                            </li>
                        </ul>
                    </div>

                    <DataGrid
                        rows={filasUsuario}
                        columns={columnasTabla}
                        pageSize={5}
                        getRowClassName={(params) => {

                            if (params.row.validado === 0) {
                                return "novalidado";
                            }

                            // Siempre tiene mayor jerarquía un baneado, es decir, si hay que elegir, aparece en rojo
                            if (params.row.baneado === 1) {

                                return "baneado";
                            }
                        }}
                        onCellDoubleClick={(params) => {
                            console.log(params.row)
                            navigate("/detalle/usuario/" + params.row.id + "/" + tipoUsuario.toLowerCase())

                        }}
                        autoHeight={true}
                        localeText={localeText}
                        style={{marginBottom: "70px", marginTop: "10px"}}
                        sx={{
                            ".baneado": {
                                bgcolor: "red",
                            },
                            ".novalidado": {
                                bgcolor: "orange",
                            },
                        }}
                    />
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


export default VerUsuariosAdministrador