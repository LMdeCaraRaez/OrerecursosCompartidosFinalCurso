import React, { Fragment, useState } from "react";


function Prueba() {
    const [fichero, setFichero] = useState(null);

    const seleccionarImagen = e => {
        setFichero(e.target.files[0]);
    }

    const enviarImagen = () => {
        console.log(fichero)
        if (!fichero) {
            alert("Debes de subir un archivo");
            return
        }

        const formData = new FormData();
        formData.append("image", fichero);

        fetch("http://localhost:9000/images/post", {
            method: "POST",
            body: formData,
        }).then(res => res.text()
            .then(res => console.log(res))
            .catch(err => console.error(err)))

        document.getElementById("fileinput").value = null;

        setFichero(null)
    }

    return (
        <Fragment>
            <div className="container mt-5">
                <div className="card p-3">
                    <div className="row">
                        <div className="col-10">
                            <input id={"fileinput"} onChange={seleccionarImagen} className={"form-control"}
                                   type={"file"}/>
                        </div>
                        <div className="col-2">
                            <button type={"button"} className={"btn btn-primary col-12"} onClick={enviarImagen}>Subir</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Prueba;
