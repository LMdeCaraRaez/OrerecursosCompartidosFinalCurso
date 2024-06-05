import React, {Fragment, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {BASEAPI} from "../modelos/constantes";


function Bienvenida() {
    const [userData, setUserData] = useState({});
    const [image, setImage] = useState("");
    const localStorageDni = JSON.parse(localStorage.getItem("dni"));
    const localStorageContrasenya = JSON.parse(localStorage.getItem("contrasenya"));
    const localStorageTipoUsuario = JSON.parse(localStorage.getItem("tipousuario"));
    const navigate = useNavigate();

    const [fichero, setFichero] = useState(null);

    const enviarImagen = () => {
        console.log(fichero)
        if (!fichero) {
            alert("Debes de subir un archivo");
            return
        }

        const formData = new FormData();
        formData.append("image", fichero);

        fetch(BASEAPI + `/images/post/${userData.dni}/${localStorageTipoUsuario}`, {
            method: "POST",
            body: formData,
        }).then(res => res.text()
            .then(res => console.log(res))
            .catch(err => console.error(err)))

        document.getElementById("fileinput").value = null;

        setFichero(null)
    }

    const seleccionarImagen = e => {
        setFichero(e.target.files[0]);
    }

    useEffect(() => {


        if (!(localStorageDni !== null && localStorageContrasenya !== null && localStorageTipoUsuario !== null)) {
            navigate('/');
        } else {
            cargarDatosUsuario(localStorageDni, localStorageContrasenya, localStorageTipoUsuario);
        }
    }, []);

    useEffect(() => {

        if (userData.imagenId) {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch(BASEAPI + `/images/get/${userData.imagenId}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    setImage(result)
                })
                .catch((error) => console.error(error));
        } else {
            setImage("userplaceholder.svg")
        }
    }, [userData]);

    return (
        <Fragment>
            <div className="bg-secondary d-flex flex-column" style={{minHeight: '100vh'}}>
                <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand">
                            <img className="mx-3" src={BASEAPI + `/logotipo.svg`} alt="" width="45"
                                 height="45"/>
                            Bienvenido {userData.nombre}
                        </a>
                        <a className="navbar-text" href="/" onClick={() => localStorage.clear()}>Cerrar sesión</a>
                    </div>
                </nav>

                <div
                    className="contenedorCuerpo bg-secondary flex-grow-0 d-flex justify-content-center align-items-center"
                    style={{marginTop: '15px', marginBottom: '15px'}}>
                    <div className="card m-3"
                         style={{width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <img src={BASEAPI + `/${image}`} className="rounded" alt="" width="150"
                             height="150"/>
                        <div className="mx-3" style={{textAlign: 'left'}}>
                            <h2>{userData.correo_electronico} - {localStorageTipoUsuario}</h2>
                            <p>{userData.nombre + " " + userData.apellidos}</p>
                        </div>
                        <div className=""
                             style={{position: 'absolute', top: 0, right: 0, marginTop: '20px', marginRight: '20px'}}>
                            <input id={"fileinput"} onChange={seleccionarImagen} className={"form-control"}
                                   type={"file"}/>
                            <button className="btn btn-primary my-3"
                                    onClick={enviarImagen}> Guardar Imagen
                            </button>
                        </div>
                    </div>
                </div>

                {filaBotones(localStorageTipoUsuario, navigate, localStorageDni)}

                <nav className="BarraInferior navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom p-0">
                    <div className="container">
                        <p className="navbar-text m-0" style={{textAlign: "center", width: "100%", fontSize: 14}}>
                            Luis Miguel de Cara Ráez - IES Oretania
                        </p>
                    </div>
                </nav>
            </div>
        </Fragment>
    );

    function cargarDatosUsuario(localStorageDni, localStorageContrasenya, localStorageTipoUsuario) {

        const url = localStorageTipoUsuario === "profesor" ? BASEAPI + `/profesor/detalle/${localStorageDni}/${localStorageContrasenya}` : BASEAPI + `/alumno/detalle/${localStorageDni}/${localStorageContrasenya}`;

        fetch(url, {
            method: "GET",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los parámetros de la llamada' + response);
                }
                return response.json();
            })
            .then(data => {
                console.log(data.validado);
                if (data.validado === 0) {
                    alert('Debes validar el correo para iniciar sesion!!!');
                    navigate('/');
                } else {
                    setUserData(data);
                }
            })
            .catch(error => {
                alert("Ha ocurrido un error: " + error);
            });
    }
}


function filaBotones(tipoAlumno, navigate, profesorId) {

    switch (tipoAlumno) {
        case "profesor":
            return (
                <div className="col mx-5 d-flex justify-content-center align-items-center">

                    <button className="btn btn-primary mx-4" style={{width: '20%'}} onClick={
                        () => navigate("/ver/prestamos/profesor/" + profesorId)
                    }>
                        <div className="row p-2">
                            <p>Prestamos</p>
                            <img className="" src={BASEAPI + "/lista.svg"} alt="" width="45" height="45"/>
                        </div>
                    </button>

                    <button className="btn btn-primary mx-4" style={{width: '20%'}} onClick={
                        () => navigate("/ver/articulos")
                    }>
                        <div className="row p-2">
                            <p>Objetos prestables</p>
                            <img className="" src={BASEAPI + "/subir.svg"} alt="" width="45" height="45"/>
                        </div>
                    </button>

                    <button className="btn btn-primary mx-4" style={{width: '20%'}} onClick={() => navigate("/prueba")}>
                        <div className="row p-2">
                            <p>Crear un nuevo préstamo</p>
                            <img className="" src={BASEAPI + `/crear.svg`} alt="" width="45" height="45"/>
                        </div>
                    </button>
                </div>
            )
        case "alumno":
            return (
                <div className="col mx-5 d-flex justify-content-center align-items-center">

                    <button className="btn btn-primary mx-4" style={{width: '20%'}}>
                        <div className="row p-2">
                            <p>Ver mis propios pedidos</p>
                            <img className="" src={BASEAPI + `/lista.svg`} alt="" width="45" height="45"/>
                        </div>
                    </button>
                </div>
            )
    }
}

export default Bienvenida;
