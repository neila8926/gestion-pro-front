import {React,useEffect} from 'react';
import {useQuery} from '@apollo/client'
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import { GET_LISTARPROYECTOS } from '../../graphql/proyectos/queries';

const IndexProyecto= ()=>{
    const {data,error,loading} = useQuery(GET_LISTARPROYECTOS);
    useEffect(() => {
        console.log("datos servidor ",data);
    }, [data]);

    useEffect(()=>{
        if(error){
            toast.error("Error al consultar los proyectos")
        }
    })

    if(loading) return <div>Cargando...</div>
    return (
        <div>
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Presupuesto</th>
                <th scope="col">Estado</th>                
                <th scope="col">Objetivo General</th>
                <th scope="col">Lider</th>
               
                </tr>
            </thead>
            <tbody>
                {data && data.Proyectos.map((proyecto)=>{
                    return(
                        <tr key={proyecto._id}>
                            
                            <td>{proyecto.nombre}</td>
                            <td>{proyecto.presupuesto}</td>
                            <td>{proyecto.estado}</td>                              
                            <td>{proyecto.objetivosGenerales}</td>
                            
                            <td>
                                <Link to={`/proyectos/editar/${proyecto._id}`}>
                                    Ver Detalle
                                </Link>
                            </td>

                        </tr>
                    )
                })}
            </tbody>
            
            </table>
        </div>
    );
};

export default IndexProyecto;