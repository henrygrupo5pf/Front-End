import { useState, useEffect } from 'react';
import styled from 'styled-components';
import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useUserStore } from '../Store/UserStore';


const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);
const BASE_URL = "https://pf-server-93lj.onrender.com"


export const Login = () => {
 
  const {setUserAuth, userAuth} = useUserStore()

  const[user, setUser] = useState({
    name: "",
    email: "",
    password:"",
    country: "",
    location: "",
    phoneNumber: "",
  })
  const [error, setError] = useState(null);
  const [registrando, setRegistrando] = useState(false); // Estado para manejar el estado de registro/inicio de sesión
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false); // Estado para indicar si el usuario está autenticado
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar si la autenticación/registro está en progreso

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        setUsuarioAutenticado(true);
      } else {
        setUserAuth(null)
        setUsuarioAutenticado(false);
      }
    });
    
    // Limpiar suscripción al desmontar el componente
    return () => unsubscribe();
  }, [setUserAuth]);

  // Método para manejar el inicio de sesión
  const handleLogin = async () => {
    try {
      if (!user.email || !user.password) {
        setError("Por favor, complete todos los campos.");
        return;
      }
      setIsLoading(true); // Iniciar el indicador de carga
      await signInWithEmailAndPassword(auth, user.email, user.password);
      // Limpiar los campos de correo electrónico y contraseña después de iniciar sesión
      setUser({ ...user, email: "", password: "" });
      setError(null);
      const userData = {
        email: user.email,
        password: user.password
      }

      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const userApi = await response.json()
      setUserAuth(userApi);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Detener el indicador de carga
    }
  };
  
  // Método para manejar el registro de usuarios
  const handleRegister = async () => {
    try {
      if (!user.email || !user.password) {
        setError("Por favor, complete todos los campos.");
        return;
      }
      if (user.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        return;
      }
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      // Limpiar los campos de correo electrónico y contraseña después de registrarse
      setUser({ ...user, email: "", password: "" });
      setError(null);
      const response = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Detener el indicador de carga
    }
  };

  // Método para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Limpiar los campos de correo electrónico y contraseña
      setUser({ ...user, email: "", password: "" });
      setError(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const isRegistering = () => {
    if(registrando){
      return (
      <div>

      <Input
        type="text"
        placeholder="Nombre"
        value={user.name}
        onChange={(e) => setUser({...user, name: e.target.value})}
      />
      
      {/* Validación de entrada para el correo electrónico */}
      <Input
        type="email"
        placeholder="Correo Electrónico"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        required
      />

      {/* Validación de entrada para la contraseña */}
      <Input
        type="password"
        placeholder="Contraseña"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        minLength="6"
        required
      />

      <Input
        type="text"
        placeholder="Pais"
        value={user.country}
        onChange={(e) => setUser({...user, country: e.target.value})}
      />

      <Input
        type="text"
        placeholder="Localidad"
        value={user.location}
        onChange={(e) => setUser({...user, location: e.target.value})}
      />

      <Input
        type="text"
        placeholder="Telefono"
        value={user.phoneNumber}
        onChange={(e) => setUser({...user, phoneNumber: e.target.value})}
      />

      
    </div>
    )

    }else{
      return(
      <ContainerInput>
        {/* Validación de entrada para el correo electrónico */}
        <Input
        type="email"
        placeholder="Correo Electrónico"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        required
      />

      {/* Validación de entrada para la contraseña */}
      <Input
        type="password"
        placeholder="Contraseña"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        minLength="6"
        required
      />
    </ContainerInput>
      )
    }
  }
  
  return (
    <Container>
      <div className="contentCard">
        <div className="card">
          <h1 className="h1">Welcome</h1>
          {usuarioAutenticado ? (
            <>
              <LoggedInMessage>Bienvenido! Usuario autenticado.</LoggedInMessage>
              <Button onClick={handleLogout}>Cerrar Sesión</Button>
            </>
          ) : (
            <>
              <Titulo>{registrando ? 'Registrarse' : 'Iniciar Sesión'}</Titulo>
              
              {isRegistering()}
              {error && <Error>{error}</Error>}
              {isLoading ? (
                <LoadingIndicator>Loading...</LoadingIndicator>
              ) : (
                <ContainerBtn>
                  <RegisterButton onClick={registrando ? handleRegister : handleLogin}>{registrando ? 'Registrarse' : 'Iniciar Sesión'}</RegisterButton>
                  <SwitchButton onClick={() => setRegistrando(!registrando)}>{registrando ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}</SwitchButton>
                </ContainerBtn>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Login;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

  .h1 {
    margin-bottom: 30px;
  }
`;

const Titulo = styled.span``;

const ContainerInput = styled.span``;

const Input = styled.input``;

const ContainerBtn = styled.div`
  text-align: center;
`;

const Button = styled.button`
padding: 10px 15px;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 21px;
margin: 2px;
transition: background-color 0.3s ease;

&:hover {
  background-color: #45a049;
}
`;

const RegisterButton = styled(Button)`
background-color: #4caf50;
  color: white;
`;

const SwitchButton = styled(Button)`
background-color: #1e90ff;
color: white;
`;
const LoadingIndicator = styled.div`
color: #1e90ff;
font-size: 18px;
margin-top: 10px;
`;

const Error = styled.p`
color: red;
font-size: 16px;
margin-top: 8px;
`;

const LoggedInMessage = styled.p`
color: green;
font-size: 18px;
font-weight: bold;
`;