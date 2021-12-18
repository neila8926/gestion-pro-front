import './App.css'
import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter,} from 'react-router-dom';
import {ApolloProvider,ApolloClient,InMemoryCache,createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import Index from './pages'
import IndexUsuario from './pages/usuarios/usuarios'
import PrivateLayout from './components/PrivateLayout'
import EditarUsuario from './pages/usuarios/EditarUsuario'
import UsuariosPendientes from './pages/usuarios/UsuariosPendientes'
import { Registro } from './pages/auth/Registro'
import AuthLayout from './components/AuthLayout'
import { Login } from './pages/auth/Login'
import { AuthContex } from './context/AuthContext'
import { UserContext } from './context/UserContext';
import EditarProyecto from './pages/proyectos/EditarProyectos'
import IndexProyecto from './pages/proyectos/ListarProyectos'
import IndexInscripcion from './pages/inscripciones/ListarInscripciones'



const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});



const cliente = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})
function App() {
  const [authToken,setAuthToken]= useState('');
  const [userData, setUserData] = useState({});

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };
  

  return (
    <ApolloProvider client={cliente}>

      <AuthContex.Provider value={{authToken,setAuthToken,setToken}}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
          
          <Routes>
              <Route path="/" element={<PrivateLayout/>}>
                  <Route  path="/" element={<Index />}/>
                  <Route  path="/usuarios" element={<IndexUsuario/>}/>
                  <Route  path="/usuarios/pendientes" element={<UsuariosPendientes/>}/>
                  <Route path="/usuarios/editar/:_id" element={<EditarUsuario/>}/>
                  <Route exact path="/proyectos" element={<IndexProyecto/>}></Route>          
                  <Route exact path="/proyectos/editar/:_id" element={<EditarProyecto/>}></Route>
                  <Route exact path="/inscripcion" element={<IndexInscripcion/>}></Route>
              </Route>
            
            <Route path='/auth' element={<AuthLayout/>}>
                <Route  path="/auth/registro" element={<Registro/>}/>
                <Route path='/auth/login' element={<Login/>} /> 
            </Route>
        
          </Routes>
        
        </BrowserRouter>
        </UserContext.Provider>
      </AuthContex.Provider>
      

    </ApolloProvider>
  )
}

export default App
