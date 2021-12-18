import {gql} from '@apollo/client';

const GET_USUARIOS=gql`
    query Usuarios {
  Usuarios {
  _id
  nombre
  apellidos
  identificacion
  estado 
  correo
  rol
  }
}`;



const GET_USUARIO=gql`
query Usuario($_id: String!) {
  Usuario(_id: $_id) {
    nombre
    apellidos
    identificacion
    correo
    estado
    rol
  }
}`;
const GET_USUARIOS_PENDIENTES=gql`
query Query {
  UsuariosPendientes {
    _id
    nombre
    apellidos
    identificacion
    correo
    estado
    rol
  }
}
`;
export {GET_USUARIOS,GET_USUARIO,GET_USUARIOS_PENDIENTES}