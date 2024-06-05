import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./paginas/home";
import Registrarse from "./paginas/registrarse";
import Bienvenida from "./paginas/bienvenida";
import Prueba from "./paginas/prueba";
import CorreoVerificado from "./paginas/correoVerificado";
import VerMateriales from "./paginas/verMateriales";
import CrearMaterial from "./paginas/anyadirMaterial";
import EditarMaterial from "./paginas/editarMaterial";
import VerPrestamos from "./paginas/verPrestamos";
import DetalleMaterial from "./paginas/detalleMaterial";
import AnyadirPrestamo from "./paginas/anyadirPrestamo";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/registrarse" element={<Registrarse/>}/>
            <Route path="/bienvenida" element={<Bienvenida/>}/>
            <Route path="/prueba" element={<Prueba/>}/>
            <Route path="/ver/articulos" element={<VerMateriales/>}/>
            <Route path="/ver/prestamos/profesor/:profesorId" element={<VerPrestamos/>}/>
            <Route path="/editar/articulo/:articuloId" element={<EditarMaterial/>}/>
            <Route path="/crear/articulos" element={<CrearMaterial/>}/>
            <Route path="/crear/prestamo/:profesorId/:materialId" element={<AnyadirPrestamo/>}/>
            <Route path="/detalle/articulo/:articuloId" element={<DetalleMaterial/>}/>
            <Route path="/correo/:correoaverificar/:tipousuario" element={<CorreoVerificado/>}/>
        </Routes>
    </Router>
);