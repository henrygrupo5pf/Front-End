import { useState, useEffect } from 'react';
import styled from 'styled-components';
import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(appFirebase);

export const Login = () => {
  // Definir estado para el campo del formulario y posibles errores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [registrando, setRegistrando] = useState(false); // Nuevo estado para manejar el estado de registro/inicio de sesión
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false); // Estado para indicar si el usuario está autenticado
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        // El usuario está autenticado
        setUsuarioAutenticado(true);
      } else {
        // El usuario no está autenticado
        setUsuarioAutenticado(false);
      }
    });
    
    // Limpiar suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  // Método para manejar el inicio de sesión
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };
  
  // Método para manejar el registro de usuarios
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  // Método para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  
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
              <Input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Error>{error}</Error>}
              <ContainerBtn>
                <RegisterButton onClick={registrando ? handleRegister : handleLogin}>{registrando ? 'Registrarse' : 'Iniciar Sesión'}</RegisterButton>
                <SwitchButton onClick={() => setRegistrando(!registrando)}>{registrando ? 'Ya tienes cuenta?' : 'No tienes cuenta?'}</SwitchButton>
              </ContainerBtn>
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

const Error = styled.p`
  /* Estilos del Error omitidos para brevedad */
`;

const LoggedInMessage = styled.p`
  /* Estilos del mensaje para usuario autenticado omitidos para brevedad */
`;