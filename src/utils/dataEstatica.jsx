import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineLogin,
  AiOutlineShoppingCart

} from "react-icons/ai";
import { v } from "../styles/variables";

export const DesplegableUser = [
{
  text: "Mi perfil",
  icono: <v.iconoUser/>,
  tipo: "miperfil",
},
{
  text: "Configuracion",
  icono: <v.iconoSettings/>,
  tipo: "configuracion",
},
{
  text: "Cerrar sesión",
  icono: <v.iconoCerrarSesion/>,
  tipo: "cerrarsesion",
},
{
  text: "Carrito",
  icono: <AiOutlineShoppingCart/>,
  tipo: "carrito",
},
];


//data SIDEBAR
export const LinksArray = [
{
  label: "Home",
  icon: <AiOutlineHome />,
  to: "/",
},
{
  label: "Nuevo Producto",
  icon: <v.iconoreportes />,
  to: "/productForm",
},
{
  label: "Login",
  icon: <AiOutlineLogin  />,
  to: "/login",
},

{
  text: "Cerrar sesión",
  icono: <AiOutlineShoppingCart/>,
  to: "/cart",
},

];
export const SecondarylinksArray = [
{
  label: "Configuración",
  icon: <AiOutlineSetting />,
  to: "/configurar",
},

];
//temas
export const TemasData = [
{
  icono: "🌞",
  descripcion: "light",
 
},
{
  icono: "🌚",
  descripcion: "dark",
  
},
];

//data configuracion
export const DataModulosConfiguracion =[
{
  title:"Productos",
  subtitle:"registra tus productos",
  icono:"https://i.ibb.co/85zJ6yG/caja-del-paquete.png",
  link:"/configurar/productos",
 
},
{
  title:"Personal",
  subtitle:"ten el control de tu personal",
  icono:"https://i.ibb.co/5vgZ0fX/hombre.png",
  link:"/configurar/usuarios",
 
},

{
  title:"Tu empresa",
  subtitle:"configura tus opciones básicas",
  icono:"https://i.ibb.co/x7mHPgm/administracion-de-empresas.png",
  link:"/configurar/empresa",
  
},
{
  title:"Categoria de productos",
  subtitle:"asigna categorias a tus productos",
  icono:"https://i.ibb.co/VYbMRLZ/categoria.png",
  link:"/configurar/categorias",
  
},
{
  title:"Marca de productos",
  subtitle:"gestiona tus marcas",
  icono:"https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
  link:"/configurar/marca",
 
},

]
//tipo usuario
export const TipouserData = [
{
  descripcion: "empleado",
  icono: "🪖",
},
{
  descripcion: "administrador",
  icono: "👑",
},
];
//tipodoc
export const TipoDocData = [
{
  descripcion: "Dni",
  icono: "🪖",
},
{
  descripcion: "Libreta electoral",
  icono: "👑",
},
{
  descripcion: "Otros",
  icono: "👑",
},
];