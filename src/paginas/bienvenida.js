import React, {Fragment, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

function Bienvenida() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [image, setImage] = useState("");

    const [fichero, setFichero] = useState(null);

    const enviarImagen = () => {
        const localStorageTipoUsuario = JSON.parse(localStorage.getItem("tipousuario"));
        console.log(fichero)
        if (!fichero) {
            alert("Debes de subir un archivo");
            return
        }

        const formData = new FormData();
        formData.append("image", fichero);

        fetch(`http://localhost:9000/images/post/${userData.dni}/${localStorageTipoUsuario}`, {
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
        const localStorageDni = JSON.parse(localStorage.getItem("dni"));
        const localStorageContrasenya = JSON.parse(localStorage.getItem("contrasenya"));
        const localStorageTipoUsuario = JSON.parse(localStorage.getItem("tipousuario"));

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

            fetch(`http://localhost:9000/images/get/${userData.imagenId}`, requestOptions)
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
                            <img className="mx-3" src={`http://localhost:9000/logotipo.svg`} alt="" width="45"
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
                        <img src={`http://localhost:9000/${image}`} className="rounded" alt="" width="150"
                             height="150"/>
                        <div className="mx-3" style={{textAlign: 'left'}}>
                            <h2>{userData.correo_electronico}</h2>
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

        const url = localStorageTipoUsuario === "profesor"
            ? `http://localhost:9000/profesor/detalle/${localStorageDni}/${localStorageContrasenya}`
            : `http://localhost:9000/alumno/detalle/${localStorageDni}/${localStorageContrasenya}`;

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

export default Bienvenida;
