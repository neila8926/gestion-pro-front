import {gql} from '@apollo/client';

const GET_PROYECTOS=gql`
query Proyecto($_id: String!) {
  Proyecto(_id: $_id) {
    nombre
    presupuesto  
    estado
    _id
    fechaInicio
    fechaFin    
    objetivosGenerales
    objetivosEspecificos
    
  }
}

`;
export {GET_PROYECTOS}

const GET_LISTARPROYECTOS=gql`
    query Proyectos {
  Proyectos {
    _id
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
export {GET_LISTARPROYECTOS}