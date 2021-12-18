import { useMutation } from '@apollo/client';
import {React,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LOGIN } from '../../graphql/auth/mutations';
import UseFormData from '../../hooks/UseFormData';
import '../../styles/login.css'

export const Login = () => {
    const navigate = useNavigate();
    const {setToken} = useAuth();
    const {form,formData,updateFormData} = UseFormData(null); 
    const [login,{data:mutationData,loading:mutationLoading,error:mutationError}]=useMutation(LOGIN);
    
    
    const submitForm=(e)=>{
        e.preventDefault();
        login({
            variables:formData
        });
    }
    useEffect(() => {
        console.log("data",mutationData);
        if(mutationData){
            if(mutationData.login){
                setToken(mutationData.login.token)
                navigate('/')
            }

        }
    }, [mutationData,setToken, navigate]);        
    
    return (
        <div>
            <div class="row justify-content-center pt-5 mt-5  mr-1">
                <div class="col-md-4 formulario">
                    <form 
                        onSubmit={submitForm}
                        onChange={updateFormData}
                        ref={form}
                    >
                        <div class="form-group text-center pt-3">
                            <h1 class="text-dark">Iniciar Sesión</h1>
                        </div>
                        <span>El
                            Usuario
                            es obligatorio</span>
                        <div class="form-group mx-sm-4 pt-3">
                            <input type="text" class="form-control" name="correo"   placeholder="Usuario" minlength="5" required/>
                        </div>
                        <span>La
                            contraseña es obligatoria</span>
                        <div class="form-group mx-sm-4 pb-3">
                            <input type="password" class="form-control" name="password" placeholder="Contraseña" minlength="6" required/>
                        </div>
                        <div class="form-group mx-sm-4 pb-5">
                            <input type="submit" class="btn btn-primary btn-block ingresar" value="Ingresar"/>
                        </div>
                        <div>
                           <Link to="/auth/registro">
                               <span >Registrarse</span>
                           </Link>
                        </div>
                        
                    </form>
                </div>
             </div>
        </div>
    )
}
