import { useState, useEffect } from 'react';
import styled from 'styled-components';
import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useUserStore } from '../Store/UserStore';
import { Link } from 'react-router-dom';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);
const BASE_URL = "https://pf-server-93lj.onrender.com"


export const Login = () => {
  const {setUserAuth} = useUserStore()

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
  
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        setUsuarioAutenticado(true);
        setUser(prevUser => ({ ...prevUser, name: usuario.displayName }));
      } else {
        setUsuarioAutenticado(false);
      }
    });
    
    return () => unsubscribe();
  }, [setUserAuth]);

  // const handleAuthentication = async (authFunction, userData) => {
  //   try {
  //     await authFunction;
      // console.log('Autenticación exitosa');
    //     const response = await fetch(`${BASE_URL}/user/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({email: user.email, password: user.password}),
    // });
  //     const userApi = await response.json();
      // console.log('Respuesta de la API:', userApi);
  //     setUserAuth(userApi);
  //     console.log(userApi);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  // Método para manejar el inicio de sesión
  const handleLogin = async () => {
    if (!validateEmail(user.email)) {
      setError("El correo electrónico no es válido");
      return;
    }
    if (!validatePassword(user.password)) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {

      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: user.email, password: user.password}),
      });
      const userData = await response.json()
      console.log(userData);
      signInWithEmailAndPassword(auth, user.email, user.password);
      setUserAuth(userData)
      
    } catch (error) {
      console.log(error);
    }

    
  };

  // Método para manejar el registro de usuarios
  const handleRegister = async () => {
    if (!validateEmail(user.email)) {
      setError("El correo electrónico no es válido");
      return;
    }
    if (!validatePassword(user.password)) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {

      const response = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      const userData = await response.json()
  
      createUserWithEmailAndPassword(auth, user.email, user.password);
      setUserAuth(userData)
      
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser({ ...user, name: result.user.displayName }); // Actualiza el nombre del usuario en el estado user
      setUserAuth(result.user);
    } catch (error) {
      setError(error.message);
    }
  };
  // Método para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUsuarioAutenticado(false);
      setUserAuth(null);
    } catch (error) {
      setError('Error al cerrar sesión: ' + error.message);
    }
  };
  // Método para manejar la recuperación de contraseña
const handleForgotPassword = async () => {
  if (!validateEmail(user.email)) {
    setError("Por favor, ingresa un correo electrónico válido para restablecer tu contraseña.");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, user.email);
    setError(null);
    setError("Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.");
  } catch (error) {
    setError("Ha ocurrido un error al intentar restablecer tu contraseña. Por favor, inténtalo de nuevo más tarde.");
  }
};
  const isRegistering = () => {
    if (registrando) {
      return (
      <div>
        <Input
        type="text"
        placeholder="Nombre"
        value={user.name}
        onChange={(e) => setUser({...user, name: e.target.value})}
      />

      <Input
        type="email"
        placeholder="Correo Electrónico"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
      />

      <Input
        type="password"
        placeholder="Contraseña"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
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
    );
  } else {
  return(
      <ContainerInput>
        <Input
        type="email"
        placeholder="Correo Electrónico"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
      />

      <Input
        type="password"
        placeholder="Contraseña"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
      />
    </ContainerInput>
      )
    }
  }

  return (
    <Container>
      <div className="contentCard">
        <div className="card">
          <WelcomeTitle className="h1">Welcome</WelcomeTitle>
          {usuarioAutenticado ? (
            <>
              <LoggedInMessage>¡Hola! {user.name}</LoggedInMessage>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <ReservarButton>Reserva un producto</ReservarButton>
              </Link>
              <Link to="/productForm" style={{ textDecoration: 'none' }}>
                <PublicarButton>Publica un producto</PublicarButton>
              </Link><LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
            </>
          ) : (
            <>
              <Titulo>{registrando ? 'Registrarse' : 'Iniciar Sesión'}</Titulo>
              {isRegistering()}
              {error && <Error>{error}</Error>}
              <ContainerBtn>
                <RegisterButton onClick={registrando ? handleRegister : handleLogin}>{registrando ? 'Registrarse' : 'Iniciar Sesión'}</RegisterButton>
                <Button onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</Button>
                <GoogleLoginButton onClick={handleGoogleLogin}>Iniciar sesión con Google</GoogleLoginButton>
                <SwitchButton onClick={() => setRegistrando(!registrando)}>{registrando ? '¿Ya tienes cuenta?' : 'Crear cuenta nueva'}</SwitchButton>
              </ContainerBtn>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Login;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: #fff;
border: none;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
box-sizing: border-box;
margin: 40px auto 0; 
padding: 20px 0 28px;
max-width: 396px;
width: 90%; 
justify-content: center;
text-align: center;
`;

const Titulo = styled.h2`
text-align: center;
`;

const ContainerInput = styled.span`
  background: #FFFFFF;
  border: 1px solid #dddfe2;
  color: #1d2129;
  border-radius: 5px;
  margin-bottom: 15px;
  
  
`;   
const Input = styled.input`
  width: 85%;
  border: none;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: block;
  margin-left: 30px
  
  

`;   
const ContainerBtn = styled.div`
  text-align: center;
`;

const Button = styled.button`
  background-color: white;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 48px;
  padding: 0 16px;
  width: 90%;
  max-width: 332px;
  margin-bottom: 10px;
  color: #4caf50;

&:hover {
  filter: brightness(0.9);
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

const GoogleLoginButton = styled(Button)`
  background-color: #db4437;
  color: white;
`;

const Error = styled.p`
color: red;
margin-top: 10px;
`;

const LoggedInMessage = styled.p`
color: #4caf50;
margin-top: 10px;
`;
const WelcomeTitle = styled.h1`
  color: #4caf50;
`;
const LogoutButton = styled(Button)`
  background-color: #f44336; // Color de fondo rojo
  color: white; // Color del texto blanco
`;

const ReservarButton = styled(Button)`
  background-color: #ff9800; // Color de fondo naranja
  color: white; // Color del texto blanco
`;

const PublicarButton = styled(Button)`
  background-color: #2196f3; // Color de fondo azul
  color: white; // Color del texto blanco
`;