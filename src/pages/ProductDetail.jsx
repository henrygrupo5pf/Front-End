import { useParams } from "react-router-dom"
import {useState, useEffect} from "react"
import styled from "styled-components"

export const ProductDetail = () => {
    const BASE_URL = "https://pf-server-93lj.onrender.com"

    const {id} = useParams()

    const[product, setProduct] = useState({})

    const[user, setUser] = useState({
        image:"https://static.vecteezy.com/system/resources/previews/008/844/895/non_2x/user-icon-design-free-png.png"
    })

    useEffect(() => {
        const getData = async() =>{
            if (Object.keys(product).length === 0) {
                const responseProduct = await fetch(`${BASE_URL}/product/${id}`)
                if (!responseProduct.ok) {
                    throw new Error(`Error de red - Código de estado: ${response.status}`);
                }

                const data = await responseProduct.json();

                setProduct(data)
                setUser({...user, ...data.User})
                
            }
        }

        getData()
    })

    return(<Container>

            <div className="mainContainer">
                <div className="imageContainer">
                        <img className="imageProduct" src={"https://img.freepik.com/psd-gratis/maqueta-portatil-aislada_1310-1458.jpg?w=740&t=st=1706673296~exp=1706673896~hmac=75bc7fc0d23f943929013417afa65e4b5c50bdad80b0f36dc61b67b62bfd5ac3"} alt="" />

                        {/* ARREGLAR IMAGEN CUANDO LOS PRODUCTOS LA TENGAN */}
                    </div>

                    <div className="info">
                        <div className="userInfo">
                            <img className="imageUser" src={user.image} alt="" />
                            <h5>{user.name}</h5>
                        </div>

                        <div className="productInfo">
                            <div className="nameCost">
                                Name
                                <h3>{product.name}</h3>
                                Cost
                                <h1>{product.cost} $</h1>
                            </div>
                            Description:
                            <div className="descriptionContainer">
                                {product.description}
                            </div>   
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
        height: 70%;
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
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .imageProduct{
        width:inherit;
    }

    .info{
        width: 500px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        border-radius: 10px;
        border: 2px solid grey;
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
        justify-content: space-around;
        flex-direction: column;
        height: 300px;
        
    }

    .nameCost{
        border: 1px solid grey;
        padding: 2px;
        border-radius: 10px;
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