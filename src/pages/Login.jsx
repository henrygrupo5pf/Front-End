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
  const [registrando, setRegistrando] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [loading, setLoading] = useState(false); // Nuevo estado para indicar carga
  //método que mantiene la sesión iniciada 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        setUsuarioAutenticado(true);
      } else {
        setUsuarioAutenticado(false);
      }
    });
    
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoading(true); // Mostrar indicador de carga al iniciar sesión
    try {
      // Validación de entrada
      if (!email || !password) {
        setError("Por favor, ingresa un correo electrónico y una contraseña.");
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Manejo de errores más detallado
      if (error.code === "auth/invalid-email") {
        setError("Correo electrónico no válido.");
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      } else {
        setError("Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
      }
    }
    setLoading(false); // Ocultar indicador de carga después de finalizar la autenticación
  };
  
  const handleRegister = async () => {
    setLoading(true); // Mostrar indicador de carga al registrarse
    try {
      // Validación de entrada
      if (!email || !password) {
        setError("Por favor, ingresa un correo electrónico y una contraseña.");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Manejo de errores más detallado
      if (error.code === "auth/email-already-in-use") {
        setError("El correo electrónico ya está en uso. Por favor, utiliza otro correo electrónico.");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña es demasiado débil. Debe tener al menos 6 caracteres.");
      } else {
        setError("Error al registrarse. Por favor, inténtalo de nuevo más tarde.");
      }
    }
    setLoading(false); // Ocultar indicador de carga después de finalizar el registro
  };

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
              {loading ? ( // Feedback visual durante la autenticación
                <LoadingIndicator>Cargando...</LoadingIndicator>
              ) : (
                <ContainerBtn>
                  <RegisterButton onClick={registrando ? handleRegister : handleLogin}>{registrando ? 'Registrarse' : 'Iniciar Sesión'}</RegisterButton>
                  <SwitchButton onClick={() => setRegistrando(!registrando)}>{registrando ? 'Ya tienes cuenta?' : 'No tienes cuenta?'}</SwitchButton>
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
  color: red;
  font-size: 16px;
  margin-top: 8px;
`;

const LoggedInMessage = styled.p`
  color: green;
  font-size: 18px;
  font-weight: bold;
`;

const LoadingIndicator = styled.div`
  color: #1e90ff;
  font-size: 18px;
  margin-top: 10px;
`;
