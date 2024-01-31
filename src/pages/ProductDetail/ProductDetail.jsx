import style from "./ProductDetail.module.css"
import { useParams } from "react-router-dom"
import {useState, useEffect} from "react"

export const ProductDetail = () => {

    const BASE_URL = "https://pf-server-93lj.onrender.com"

    const {id} = useParams()

    const[product, setProduct] = useState({
    })

    const[user, setUser] = useState({
        image:"https://static.vecteezy.com/system/resources/previews/008/844/895/non_2x/user-icon-design-free-png.png"
    })

    useEffect(() => {
        const getData = async() =>{
            const responseProduct = await fetch(`${BASE_URL}/product/${id}`)
            if (!responseProduct.ok) {
                throw new Error(`Error de red - Código de estado: ${response.status}`);
            }

            const data = await responseProduct.json();

            setProduct(data)
            setUser({...user, ...data.User})
            console.log(data);
        }

        getData()
    })

    return(
        <div className={style.main_container}>
            <div className={style.info_container}>

                <div className={style.img_container}>
                    <img src={"https://img.freepik.com/psd-gratis/maqueta-portatil-aislada_1310-1458.jpg?w=740&t=st=1706673296~exp=1706673896~hmac=75bc7fc0d23f943929013417afa65e4b5c50bdad80b0f36dc61b67b62bfd5ac3"} alt="" />

                    {/* ARREGLAR IMAGEN CUANDO LOS PRODUCTOS LA TENGAN */}
                </div>

                <div className={style.info}>
                    <div className={style.user_info}>
                        <img src={user.image} alt="" />
                        <h5>{user.name}</h5>
                    </div>

                    <div className={style.product_info}>
                        <h2>{product.name}</h2>
                        <h1>{product.cost}</h1>
                        <h4>{product.description}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
