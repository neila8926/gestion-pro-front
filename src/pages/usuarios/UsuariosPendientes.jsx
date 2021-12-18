import {React,useEffect,useState} from 'react';
import {useMutation, useQuery} from '@apollo/client'
import { toast } from 'react-toastify';
import { GET_USUARIOS_PENDIENTES } from '../../graphql/usuarios/queries';
import { Link } from 'react-router-dom';
import { EDITAR_USUARIO } from '../../graphql/usuarios/mutations';

const UsuariosPendientes= ()=>{
    const {data,error,loading} = useQuery(GET_USUARIOS_PENDIENTES);
    const [handleChange, setHandleChange] = useState();
    const [editarUsuario,{data:mutationData,loading:mutationLoading,error:mutationError}]=useMutation(EDITAR_USUARIO);
    
    
    const cambiarEstado=(e)=>{
        e.preventDefault();
        
       // console.log("Fd",formData)
    };

    useEffect(() => {
        console.log("datos servidor ",data);
    }, [data]);

    useEffect(()=>{
        if(error){
            toast.error("Error al consultar los usuarios")
        }
    });
    const handle=(event)=>{
        console.log(event.target.value)
        setHandleChange(event.target.value);
    }

    if(loading) return <div>Cargando...</div>
    return (
        <div>
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Identificacion</th>
                <th scope="col">Correo</th>
                <th scope="col">Rol</th>
                <th scope="col">Estado</th>
                <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
                {data && data.UsuariosPendientes.map((usuario)=>{
                    return(
                        <tr key={usuario._id}>
                            <td>{usuario.nombre} {usuario.apellidos}</td>
                            <td>{usuario.identificacion}</td>
                            <td>{usuario.correo}</td>   
                            <td>{usuario.rol}</td>
                            <td>{usuario.estado}</td>
                            <td>
                                <select  className="form-control" id="estado" defaultValue={usuario.estado} onChange={handle} name="estado">
                                    <option value="AUTORIZADO">Autorizado</option>
                                    <option  value="PENDIENTE">Pendiente</option>
                                    <option value="NO_AUTORIZADO">No Autorizado</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={cambiarEstado}>Cambiar</button>
                            </td>

                        </tr>
                    )
                })}
            </tbody>
            
            </table>
        </div>
    );
};

export default UsuariosPendientes;