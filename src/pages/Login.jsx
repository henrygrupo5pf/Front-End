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
  const [registrando, setRegistrando] = useState(false); // Nuevo estado para manejar el estado de registro/inicio de sesión
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false); // Estado para indicar si el usuario está autenticado
  
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
  }, []);

  // Método para manejar el inicio de sesión
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);

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
    }
  };
  
  // Método para manejar el registro de usuarios
  const handleRegister = async () => {
    try {
       
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      
      const response = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const userApi = await response.json()

      setUserAuth(userApi);

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

  const isRegistering = () => {
    if(registrando){
      return (
      <ContainerInput>

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

      
    </ContainerInput>
    )

    }else{
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
        <h1 className="h1">Welcome</h1>
          {usuarioAutenticado ? (
            <>
              <LoggedInMessage>Bienvenido! Usuario autenticado.</LoggedInMessage>
              <Button onClick={handleLogout}>Cerrar Sesión</Button>
            </>
          ) : (
            <>
              <ContainerForm>
                <Titulo>{registrando ? 'Registrarse' : 'Iniciar Sesión'}</Titulo>
                {isRegistering()}

                {error && <Error>{error}</Error>}
                <ContainerBtn>
                  <RegisterButton onClick={registrando ? handleRegister : handleLogin}>{registrando ? 'Registrarse' : 'Iniciar Sesión'}</RegisterButton>
                  <SwitchButton onClick={() => setRegistrando(!registrando)}>{registrando ? 'Ya tienes cuenta?' : 'No tienes cuenta?'}</SwitchButton>
                </ContainerBtn>
              </ContainerForm>
              
              
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

const ContainerForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 450px;
  height: 100%;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 10px 17px black;
  padding: 50px 0 20px 0;
`;

const ContainerInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
padding: 8px;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
margin-bottom: 10px;
min-width: 330px;

&:focus{
  border-color: #66afe9;
}
`;

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