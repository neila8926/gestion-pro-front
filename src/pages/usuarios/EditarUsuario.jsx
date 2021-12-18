import { useMutation, useQuery } from '@apollo/client';
import React, { useState,useEffect } from 'react'
import {useParams,Link} from 'react-router-dom'
import { EDITAR_USUARIO } from '../../graphql/usuarios/mutations';
import { GET_USUARIO } from '../../graphql/usuarios/queries';
import UseFormData from '../../hooks/UseFormData';
import {toast} from 'react-toastify';



const EditarUsuario = () => {

    const {form,formData,updateFormData} = UseFormData(null);  
    const {_id}= useParams();
   
    const [handleChange, setHandleChange] = useState();
    
    const {data:queryData,error:queryError,loading:queryLoading}= useQuery(GET_USUARIO,{
        variables:{_id}
    });
   
    console.log("variable prueba"+ {variables:{_id}});

    const [editarUsuario,{data:mutationData,loading:mutationLoading,error:mutationError}]=useMutation(EDITAR_USUARIO);
    
    
    const submitForm=(e)=>{
        e.preventDefault();
        editarUsuario({
            variables:{_id, ...formData},
        })
        console.log("Fd",formData)
    };

    useEffect(() => {
        if(mutationData){
            toast.success('Usuario actualizado!!');
        }
        console.log("mutationdata",mutationData)
    }, [mutationData]);

    useEffect(() => {
        if(queryError){
            toast.error("Error consultando el usuario")
        }
        if(mutationError){
            toast.error('Error al actualizar el usuario');
        }
        console.log("mutationdata",mutationData)
    }, [mutationError,queryError]);
    
    
    
    
    const handle=(event)=>{
        console.log(event.target.value)
        setHandleChange(event.target.value);
    }
    
    console.log('que trae el query'+queryData);
   
    if(queryLoading) return <div>Cargando....</div>;
    return (
        <div className="container col-7 mt-4">
            <legend>Actualizar Usuario</legend>
            <hr/>
            <form
            onSubmit={submitForm}
            onChange={updateFormData}
            ref={form}
            >
                <div class="mb-3">
                    <label for="identificacion" class="form-label">Identificación</label>
                    <input type="text" name="identificacion" className="form-control" id="identificacion" defaultValue={queryData.Usuario.identificacion}/>
                </div>
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" name="nombre"className="form-control" id="nombre" defaultValue={queryData.Usuario.nombre}/>
                </div>
                <div class="mb-3">
                    <label for="apellidos" class="form-label">Apellidos</label>
                    <input type="text" name="apellidos" className="form-control" id="apellidos" defaultValue={queryData.Usuario.apellidos}/>
                </div>
                <div class="mb-3">
                    <label for="correo" class="form-label">Correo</label>
                    <input type="email" name="correo" className="form-control" id="correo" defaultValue={queryData.Usuario.correo}/>
                </div>
                <div class="mb-3">
                    <label for="rol" class="form-label">Rol</label>
                    <select  className="form-control" id="rol" defaultValue={queryData.Usuario.rol} onChange={handle} name="rol" selected="true" disabled="disabled"  >
                        <option value="ESTUDIANTE">ESTUDIANTE</option>
                        <option value="LIDER">LIDER</option>
                        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="estado" class="form-label">Estado</label>
                    <select  className="form-control" id="estado" defaultValue={queryData.Usuario.estado} onChange={handle} name="estado">
                        <option value="AUTORIZADO">AUTORIZADO</option>
                        <option  value="PENDIENTE">PENDIENTE</option>
                        <option value="NO_AUTORIZADO">NO_AUTORIZADO</option>
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Actualizar" />
            </form>

        </div>
    )
}

export default EditarUsuario
