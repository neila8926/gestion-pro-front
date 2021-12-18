import {createContext,useContext} from 'react';

export const AuthContex=createContext(null);
export const useAuth=()=>{
    return useContext(AuthContex);
}