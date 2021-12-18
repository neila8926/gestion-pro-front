import {gql} from '@apollo/client';



const GET_INSCRIPCIONES=gql`
    query Inscripciones {
  Inscripciones {
    _id
    estado
    fechaIngreso
    fechaEgreso
    proyecto {
      nombre
    }
    estudiante {
      nombre
    }
  }
}

`;
export {GET_INSCRIPCIONES}