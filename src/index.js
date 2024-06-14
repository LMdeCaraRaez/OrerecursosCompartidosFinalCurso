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
import DetallePrestamo from "./paginas/detallePrestamo";
import EntregarPrestamo from "./paginas/entregarPrestamo";
import BienvenidaAdministrador from "./paginas/bienvenidaAdministrador";
import VerUsuariosAdministrador from "./paginas/verUsuariosAdministrador";
import DetalleUsuario from "./paginas/detalleUsuario";
import VerPrestamosAdministrador from "./paginas/verPrestamosAdministrador";
import VerMaterialesAdministrador from "./paginas/verMaterialesAdministrador";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/registrarse" element={<Registrarse/>}/>
            <Route path="/bienvenida" element={<Bienvenida/>}/>
            <Route path="/bienvenida/administrador" element={<BienvenidaAdministrador/>}/>
            <Route path="/prueba" element={<Prueba/>}/>
            <Route path="/ver/articulos" element={<VerMateriales/>}/>
            <Route path="/ver/prestamos/:usuarioId/:tipoUsuario" element={<VerPrestamos/>}/>
            <Route path="/ver/usuarios/admin" element={<VerUsuariosAdministrador/>}/>
            <Route path="/ver/prestamos/admin" element={<VerPrestamosAdministrador/>}/>
            <Route path="/ver/materiales/admin" element={<VerMaterialesAdministrador/>}/>
            <Route path="/editar/articulo/:articuloId" element={<EditarMaterial/>}/>
            <Route path="/crear/articulos" element={<CrearMaterial/>}/>
            <Route path="/crear/prestamo/:profesorId/:materialId" element={<AnyadirPrestamo/>}/>
            <Route path="/entregar/prestamo/:prestamoId" element={<EntregarPrestamo/>}/>
            <Route path="/detalle/articulo/:articuloId/:tipoUsuario" element={<DetalleMaterial/>}/>
            <Route path="/detalle/prestamo/:prestamoId/:tipoUsuario" element={<DetallePrestamo/>}/>
            <Route path="/detalle/usuario/:usuarioId/:tipoUsuario" element={<DetalleUsuario/>}/>
            <Route path="/correo/:correoaverificar/:tipousuario" element={<CorreoVerificado/>}/>
        </Routes>
    </Router>
);