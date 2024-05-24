import React, {Fragment, useState} from "react";

function Registrarse() {
    const [tipoUsuario, setTipoUsuario] = useState("Tipo de usuario");

    return (
        <Fragment>
            <nav className="BarraSuperior navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img className="mx-3" src="../../recursos/imagenes/logotipo.svg" alt="" width={"45"} height={"45"}/>
                        Orerecursos compartidos
                    </a>
                </div>
            </nav>
            <div className="contenedorCuerpo" align="center" style={{marginTop: '15px', marginBottom: '15px'}}>
                <div className="container contenedorCentral m-3">

                    <div className="row m-2">
                        <p className="fs-1">Registrarse</p>
                        <div className="dropdown pb-2">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                {tipoUsuario}
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item"
                                       onClick={() => {
                                           setTipoUsuario("Profesor")
                                       }}>Profesor</a></li>
                                <li><a className="dropdown-item"
                                       onClick={() => {
                                           setTipoUsuario("Alumno")
                                       }}>Alumno</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col m-2" align="center">
                        <input id={"correo"} type="text" className="form-control my-3" placeholder="Correo electrónico"
                               style={{width: '700px'}}/>
                        <input id={"telefono"} type="text" className="form-control my-3"
                               placeholder="Numero de teléfono"
                               style={{width: '700px'}}/>
                        <input id={"nombre"} type="text" className="form-control my-3" placeholder="Nombre"
                               style={{width: '700px'}}/>
                        <input id={"apellidos"} type="text" className="form-control my-3" placeholder="Apellidos"
                               style={{width: '700px'}}/>
                        <input id={"fecha"} type="date" className="form-control my-3" placeholder="Fecha de nacimiento"
                               style={{width: '700px'}}/>
                        <input id={"dni"} type="text" className="form-control my-3" placeholder="Dni"
                               style={{width: '700px'}}/>
                        <input id={"contrasenya"} type="password" className="form-control my-3" placeholder="Contraseña"
                               style={{width: '700px'}}/>
                        <button type="button" onClick={() => {
                            if (tipoUsuario === "Profesor" || tipoUsuario === "Alumno"){
                                const nombre = document.getElementById("nombre").value;
                                const apellidos = document.getElementById("apellidos").value;
                                const correo = document.getElementById("correo").value;
                                const fecha = document.getElementById("fecha").value;
                                const dni = document.getElementById("dni").value;
                                const contrasenya = document.getElementById("contrasenya").value;
                                const telefono = document.getElementById("telefono").value;

                                if (nombre === "" || apellidos === "" || correo === "" || fecha === "" || dni === "" || contrasenya === "" || telefono === "") {
                                    alert("Debe rellenar todos los campos");
                                } else {

                                    const myHeaders = new Headers();
                                    myHeaders.append("Content-Type", "application/json");

                                    const body = JSON.stringify({
                                        "dni": dni,
                                        "correo": correo,
                                        "nombre": nombre,
                                        "apellidos": apellidos,
                                        "fechaNacimiento": fecha,
                                        "contrasenya": contrasenya,
                                        "telefono": telefono
                                    });
                                    let tipousuario


                                    if (tipoUsuario === "Alumno"){
                                        tipousuario = "alumno"
                                        console.log("El alumno es esto: " + body);

                                        fetch("http://localhost:9000/alumno/post", {
                                            method: "POST",
                                            headers: myHeaders,
                                            body: body
                                        }).then(response => {
                                            if (!response.ok) {
                                                throw new Error('Error al enviar los datos del alumno');
                                            }
                                            return response.json();
                                        })
                                            .then(data => {
                                                console.log(data);
                                                alert('Los datos del alumno se han enviado correctamente');
                                            })
                                            .catch(error => {
                                                console.error('Error:', error);
                                                alert('Ha ocurrido un error al enviar los datos del alumno');
                                            });
                                    } else {
                                        tipousuario = "profesor"
                                        console.log("El profesor es esto: " + body);

                                        fetch("http://localhost:9000/profesor/post", {
                                            method: "POST",
                                            headers: myHeaders,
                                            body: body
                                        }).then(response => {
                                            if (!response.ok) {
                                                throw new Error('Error al enviar los datos del alumno');
                                            }
                                            return response.json();
                                        })
                                            .then(data => {
                                                console.log(data);
                                                alert('Los datos del profesor se han enviado correctamente');
                                            })
                                            .catch(error => {
                                                console.error('Error:', error);
                                                alert('Ha ocurrido un error al enviar los datos del alumno');
                                            });
                                    }



                                    fetch(`http://localhost:9000/enviarcorreoverificacion/${correo}/${tipousuario}`, {
                                        method: "POST",
                                    }).then(res => res.text()
                                        .then(res => {
                                            console.log(res)

                                            alert("Se ha enviado un correo de verificación")
                                        })
                                        .catch(err => console.error(err)))


                                }
                            } else alert("Debes seleccionar un tipo de usuario")

                        }} className="btn btn-outline-primary" style={{marginBottom:'50px' ,width: '500px'}}>
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
            <nav className="BarraInferior navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom p-0">
                <div className="container">
                    <p className="navbar-text m-0" style={{textAlign: "center", width: "100%", fontSize: 14}}>Luis
                        Miguel de Cara Ráez - IES Oretania</p>
                </div>
            </nav>
        </Fragment>
    );
}


export default Registrarse;