import {gql} from '@apollo/client';

const EDITAR_USUARIO=gql`
mutation EditarUsuario(
    $_id: String!,
    $nombre: String,
    $apellidos: String,
    $identificacion: String, 
    $correo: String,
    $estado: Enum_EstadoUsuario,
    ) {
  editarUsuario(
      _id: $_id,
      nombre: $nombre,
      apellidos: $apellidos,
      identificacion: $identificacion,
      correo: $correo,
      estado: $estado,
      ) {
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
export {EDITAR_USUARIO}