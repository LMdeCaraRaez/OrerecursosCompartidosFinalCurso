import React, {Fragment, useState} from "react";
import {Route, Router, Routes, useNavigate} from 'react-router-dom';
import Registrarse from "./paginas/registrarse";
import Home from "./paginas/home";



function App() {

    return (
        <Routes>
            <Route path="/paginas/home" element={<Home/>}/>
            <Route path="/paginas/registrarse" element={<Registrarse/>}/>
        </Routes>
    );
}

export default App;
