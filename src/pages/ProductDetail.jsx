import { useParams, useNavigate } from "react-router-dom"
import {useState, useEffect} from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useCartStore } from "../Store/CartStore";

export const ProductDetail = () => {
    const BASE_URL = "https://pf-server-93lj.onrender.com"

    const {id} = useParams()

    const[product, setProduct] = useState({})

    const[user, setUser] = useState({
        image:"https://static.vecteezy.com/system/resources/previews/008/844/895/non_2x/user-icon-design-free-png.png"
    })
    const { addToCart } = useCartStore(); 
    const navigate = useNavigate();

    // useEffect(() => {
    //     const getData = async() =>{
    //         if (Object.keys(product).length === 0) {
    //             const responseProduct = await fetch(`${BASE_URL}/product/${id}`)
    //             if (!responseProduct.ok) {
    //                 throw new Error(`Error de red - Código de estado: ${response.status}`);
    //             }

    //             const data = await responseProduct.json();

    //             setProduct(data)
    //             setUser({...user, ...data.User})
                
    //         }
    //     }

    //     getData()
    // })
    useEffect(() => {
        const getData = async () => {
            const responseProduct = await fetch(`${BASE_URL}/product/${id}`);
            if (!responseProduct.ok) {
                throw new Error(`Error de red - Código de estado: ${responseProduct.status}`);
            }
    
            const data = await responseProduct.json();
    
            setProduct(data);
            setUser((currentUser) => ({ ...currentUser, ...data.User }));
        };
    
        if (Object.keys(product).length === 0) {
            getData();
        }
    }, [id, product]); // Ahora incluye `product` en el array de dependencias
    
    
    

    const handleAddToCart = () => {
        // Añade el producto al carrito
        addToCart({
            ...product,
            id: product.id, // Asegúrate de que el producto tenga una propiedad 'id'
            name: product.name,
            cost: product.cost,
            quantity: 1 // Esto puede ser opcional dependiendo de cómo manejas la cantidad en addToCart
        });
        console.log(`Producto añadido al carrito: ${product.name}`);
        // navigate('/cart');

    };

    return(<Container>

            <div className="mainContainer">
                <div className="imageContainer">
                        <img className="imageProduct" src={product.photo} alt="" />

                        {/* ARREGLAR IMAGEN CUANDO LOS PRODUCTOS LA TENGAN */}
                    </div>

                    <div className="info">
                        <div className="userInfo">
                            <img className="imageUser" src={user.image} alt="" />
                            <h5>{user.name}</h5>
                        </div>

                        <div className="productInfo">
                            <div className="nameCost">
                                Nombre
                                <h3>{product.name}</h3>
                                Costo
                                <h1>${product.cost} Por Dia</h1>
                            </div>
                            Description:
                            <div className="descriptionContainer">
                                {product.description}
                            </div>
                            <Button onClick={handleAddToCart}> Reservar </Button>
                            <Link to='/'>
                                <Button style={{width:'100%'}}> Salir </Button>
                            </Link>
                        </div>
                        
                    </div>
            </div>

        </Container>
    )
}
export default ProductDetail;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    

    .mainContainer{
        height: 500px;
        box-shadow: 5px 10px 17px black;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 10px;
        padding: 10px;
    }
    
    .imageContainer{
        width: 500px;
        height: inherit;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .imageProduct{
        width:80%;
    }

    .info{
        width: 500px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        border-radius: 10px;
        border: 2px solid grey;
        padding: 5px;
    }

    .userInfo{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        
    }

    .productInfo{
        width: 85%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        height: 370px;
        
    }

    .nameCost{
        border: 1px solid grey;
        padding: 2px;
        border-radius: 10px;
        text-align:  center;
    }

    .imageUser{
        width: 50px;

    }

    .descriptionContainer{
        width: 100%;
        min-height: 80px;
        max-height: 500px;
        border: 1px solid grey;
        padding: 2px;
        border-radius: 10px;

    }

`

const Button = styled.button`
background-color: #4caf50;
color: white;
padding: 10px 15px;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 25px;
margin: 2px;
/* Estilo para cuando el elemento está siendo presionado */
&:active {
  background-color: #dbdbdb; /* Este color se aplica cuando se hace clic */
}
`;