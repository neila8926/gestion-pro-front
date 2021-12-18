import {gql} from '@apollo/client';

const EDITAR_PROYECTO=gql`
mutation EditarProyecto($_id: String!, $nombre: String, $presupuesto: Float, $fechaInicio: Date, $fechaFin: Date, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto, $lider: String, $objetivosGenerales: String, $objetivosEspecificos: [String]) {
  editarProyecto(_id: $_id, nombre: $nombre, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, estado: $estado, fase: $fase, lider: $lider, objetivosGenerales: $objetivosGenerales, objetivosEspecificos: $objetivosEspecificos) {
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      nombre
    }
    objetivosGenerales
    objetivosEspecificos
    avances {
      descripciones
    }
    inscripciones {
      estado
    }
  }
}
`;

const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $lider: String!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      lider: $lider
      objetivos: $objetivos
    ) {
      _id
    }
  }
`;

export {EDITAR_PROYECTO, CREAR_PROYECTO}