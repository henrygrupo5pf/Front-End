import { useState } from 'react'
import{Route, Routes} from "react-router-dom"
import Home from './Views/Home/Home'
import Profile from "./Views/Profile/Profile"
import NavBar from './Components/NavBar/NavBar'
import Footer from './Components/Footer/Footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
        <NavBar></NavBar>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            {/* Este componente deberia funcionar como un detail pero para usuarios */}
            {/* si se hace click en el perfil de un vendedor, usa la id del vendedor para mostrar sus datos
            si se hace click en "mi perfil" o algo similar, usa la id del usuario para mostrar sus datos */}

        </Routes>
        <Footer></Footer>

    </div>
      
  )
}

export default App
//mensaje de prueba git
