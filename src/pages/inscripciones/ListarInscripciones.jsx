import {React,useEffect} from 'react';
import {useQuery} from '@apollo/client'
import { toast } from 'react-toastify';



import { GET_INSCRIPCIONES } from '../../graphql/inscripciones/queries';

const IndexInscripcion= ()=>{
    const {data,error,loading} = useQuery(GET_INSCRIPCIONES);
    useEffect(() => {
        console.log("datos servidor ",data);
    }, [data]);

    useEffect(()=>{
        if(error){
            toast.error("Error al consultar inscripciones")
        }
    })

    if(loading) return <div>Cargando...</div>
    return (
        <div>
        
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Estado</th>
                <th scope="col">Proyecto</th>
                <th scope="col">Estudiante</th>                
                <th scope="col">Fecha Ingreso</th>
                <th scope="col">Fecha Egreso</th>
               
                </tr>
            </thead>
            <tbody>
                {data && data.Inscripciones.map((inscripcion)=>{
                    return(
                        <tr key={inscripcion._id}>
                            
                            <td>{inscripcion.estado}</td>
                            <td>{inscripcion.proyecto.nombre}</td>
                            <td>{inscripcion.estudiante.nombre}</td>                              
                            <td>{inscripcion.fechaIngreso}</td>
                            <td>{inscripcion.fechaEgreso}</td>
                           

                        </tr>
                    )
                })}
            </tbody>
            
            </table>
        </div>
    );
};

export default IndexInscripcion;