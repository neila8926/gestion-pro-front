import { useMutation, useQuery } from '@apollo/client';
import React, { useState,useEffect } from 'react'
import {useParams,Link} from 'react-router-dom'
import UseFormData from '../../hooks/UseFormData';
import {toast} from 'react-toastify';
import { GET_LISTARPROYECTOS, GET_PROYECTOS } from '../../graphql/proyectos/queries';
import {EDITAR_PROYECTO} from '../../graphql/proyectos/mutations';



const EditarProyecto = () => {

    const {form,formData,updateFormData} = UseFormData(null);  
    const {_id}= useParams();
   
    const [handleChange, setHandleChange] = useState();
    
    const {data:queryData,error:queryError,loading:queryLoading}= useQuery(GET_PROYECTOS,{
        variables:{_id}
    });
   
    console.log("variable prueba"+ {variables:{_id}});

    const [editarProyecto,{data:mutationData,loading:mutationLoading,error:mutationError}]=useMutation(EDITAR_PROYECTO);
    
    
    const submitForm=(e)=>{
        e.preventDefault();
        editarProyecto({
            variables:{_id, ...formData},
        })
        console.log("Fd",formData)
    };

   /*  useEffect(() => {
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
    }, [mutationError,queryError]); */
    
    
    
    
   /*  const handle=(event)=>{
        console.log(event.target.value)
        setHandleChange(event.target.value);
    } */
    
  
   
    if(queryLoading) return <div>Cargando....</div>;
    console.log('que trae el query'+queryData.Proyecto);
    console.log(Object.values(queryData))
    return (
        <div className="container col-7 mt-4">
            <legend>Detalle Proyecto</legend>
            <hr/>
            <form
            onSubmit={submitForm}
            onChange={updateFormData}
            ref={form}
            >
      
                
                 <div class="mb-3">
                    <label for="nombre" className="form-label">Nombre</label>
                    <input type="text" name="nombre"className="form-control" id="nombre" defaultValue={queryData.Proyecto.nombre}/>
                </div>

                 <div class="mb-3">
                    <label for="presupuesto" className="form-label">Presupuesto</label>
                    <input type="text" name="presupuesto"className="form-control" id="presupuesto" defaultValue={queryData.Proyecto.presupuesto}/>
                </div> 

                <div class="mb-3">
                    <label for="estado" className="form-label">Estado</label>
                    <input type="text" name="estado"className="form-control" id="estado" defaultValue={queryData.Proyecto.estado}/>
                </div>

                <div class="mb-3">
                    <label for="fechaInicio" className="form-label">Fecha Inicio</label>
                    <input type="text" name="fechaInicio"className="form-control" id="fechaInicio" defaultValue={queryData.Proyecto.fechaInicio}/>
                </div> 

                <div class="mb-3">
                    <label for="fechaFin" className="form-label">Fecha Fin</label>
                    <input type="text" name="fechaFin"className="form-control" id="fechaFin" defaultValue={queryData.Proyecto.fechaFin}/>
                </div> 

                <div class="mb-3">
                    <label for="objetivosGenerales" class="form-label">Objetivo General</label>
                    <input type="text" name="objetivosGenerales"className="form-control" id="objetivosGenerales" defaultValue={queryData.Proyecto.objetivosGenerales}/>
                </div> 
                
                <div class="mb-3">
                <label for="objetivosespecificos" class="form-label">Objetivos especificos</label>
                { queryData.Proyecto.objetivosEspecificos.map((obj)=>{
                    
                    
                   
                   return(
                   <div>
                        
                        <input type="text" name="objetivosEspecificos"className="form-control" id="objetivosEspecificos" defaultValue={obj}/>
                        <br/>
                   </div>
                   )

                    
                })}
                   </div>
                 
                
                
            </form>

        </div>
    )
}

export default EditarProyecto
