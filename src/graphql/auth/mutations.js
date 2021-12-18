import {gql} from '@apollo/client';

const REGISTRO_USUARIO=gql`
mutation RegistroUsuario(
  $nombre: String!,
  $apellidos: String!, 
  $identificacion: String!, 
  $correo: String!, 
  $rol: Enum_Rol!, 
  $password: String!) {
  registroUsuario(
    nombre: $nombre, 
    apellidos: $apellidos, 
    identificacion: $identificacion, 
    correo: $correo, 
    rol: $rol, 
    password: $password) {
    token
    error
  }
}
`;

const LOGIN=gql`
  mutation Login(
    $correo: String!, 
    $password: String!) {
  login(
    correo: $correo, 
    password: $password) {
    token
  }
}
`

const REFRESH_TOKEN=gql`
  mutation RefreshToken {
  refreshToken {
  token
  error  
  }
}
`
export {REGISTRO_USUARIO, LOGIN, REFRESH_TOKEN}