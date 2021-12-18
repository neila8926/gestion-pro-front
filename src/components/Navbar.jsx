import React from 'react';
import {Link,NavLink} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom'




const Navbar =()=>{

    const {setToken}=useAuth();
    const navigate=useNavigate();
    const cerraSesion=(e)=>{
        e.preventDefault();
        console.log("probando ando",e);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/auth/login');
    }
    return(
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Coldevs</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                   
                    <li className="nav-item dropdown">
                        <a  to="/" className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Usuarios</a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><NavLink  exact to="/usuarios" className="dropdown-item"  >Listar</NavLink></li>
                            <li><NavLink  exact to="/usuarios/pendientes" className="dropdown-item"  >Pendientes</NavLink></li>
                        </ul>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Proyectos</a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                     
                            <li><NavLink  exact to="/proyectos" className="dropdown-item"  >Listar</NavLink></li>                            
                        </ul>
                    </li>

                        
                    <li className="nav-item dropdown">
                        <NavLink  to="/" className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Inscripciones</NavLink>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><NavLink  exact to="/inscripcion" className="dropdown-item"  >Listar</NavLink></li> 
                            
                        </ul>
                    </li>
                    
                </ul>
                <div className="d-flex">
                    <button type="button" className="dropdown-item" onClick={cerraSesion} >Cerrar Sesión</button> 
                    
            
                </div>
                </div>
            </div>
        </nav>
    );


}
export default Navbar;