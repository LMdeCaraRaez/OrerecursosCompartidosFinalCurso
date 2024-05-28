import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./paginas/home";
import Registrarse from "./paginas/registrarse";
import Bienvenida from "./paginas/bienvenida";
import Prueba from "./paginas/prueba";
import CorreoVerificado from "./paginas/correoVerificado";
import CrearArticuloPrestable from "./paginas/crearArticuloPrestable";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/registrarse" element={<Registrarse/>}/>
            <Route path="/bienvenida" element={<Bienvenida/>}/>
            <Route path="/prueba" element={<Prueba/>}/>
            <Route path="/ver/articulos" element={<CrearArticuloPrestable/>}/>
            <Route path="/correo/:correoaverificar/:tipousuario" element={<CorreoVerificado/>}/>
        </Routes>
    </Router>
);

