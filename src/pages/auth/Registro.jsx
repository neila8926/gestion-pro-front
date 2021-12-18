import { useMutation } from '@apollo/client';
import {Reac,useEffect} from 'react'
import { REGISTRO_USUARIO } from '../../graphql/auth/mutations';
import UseFormData from '../../hooks/UseFormData';
import '../../styles/registro.css';
import {useNavigate} from 'react-router';
import { useAuth } from '../../context/AuthContext';
import {toast} from 'react-toastify';

export const Registro = () => {
    const {setToken} = useAuth();
    const navigate = useNavigate();

    const {form,formData,updateFormData} = UseFormData(); 
    const [registrarUsuario,{data:mutationData,loading:mutationLoading,error:mutationError}]=useMutation(REGISTRO_USUARIO);

    
    const submitForm=(e)=>{
        e.preventDefault();
        registrarUsuario({variables: formData})
    }
    
    

    useEffect(() => {
        if(mutationData){
            console.log(mutationData)
            toast.success('Usuario Registrado!!');
            if(mutationData.registroUsuario){
                
                setToken(mutationData.registroUsuario.token)
                navigate('/')
            }

        }
    }, [mutationData]);
    return (
        <div className="container mt-5">
            <legend>Registro</legend>
            <hr/>
            
            <form className="row g-3" 
              onSubmit={submitForm}
              onChange={updateFormData}
              ref={form}
            >
                <div className="col-md-6">
                    <label for="inputNombre" className="form-label">Nombres</label>
                    <input type="text" name="nombre" className="form-control" id="nombre"/>
                </div>
                <div className="col-md-6">
                    <label for="inputApellidos" className="form-label">Apellidos</label>
                    <input type="text" name="apellidos" className="form-control" id="inputApellidos"/>
                </div>
                
                <div className="col-md-6">
                    <label for="inputIdentificacion" className="form-label">Número de Identificación</label>
                    <input type="text"  name="identificacion" className="form-control" id="inputIdentificacion"/>
                </div>
                <div className="col-md-6">
                    <label for="rol" className="form-label">Rol</label>
                    <select  className="form-control" id="rol"  name="rol"   >
                        <option value="ESTUDIANTE">ESTUDIANTE</option>
                        <option value="LIDER">LIDER</option>
                        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    </select>
                </div>
                <div className="col-md-12">
                    <label for="inputCorreo" className="form-label">Correo Electrónico</label>
                    <input type="text" name="correo" className="form-control" id="inputCorreo" placeholder="ejemplo@prueba.com"/>
                </div>
                <div className="col-md-6">
                    <label for="inputPassword1" className="form-label">Contraseña</label>
                    <input type="password" name="password" className="form-control" id="inputPassword1"/>
                </div>
                <div className="col-md-6">
                    <label for="inputPassword2" className="form-label">Confirmar Contraseña</label>
                    <input type="password" className="form-control" id="inputPassword2"/>
                </div>
                
                <div class="col-md-12">
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
            </form>
</div>

    )
}
