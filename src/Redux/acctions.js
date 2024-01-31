import GET_PRODUCTS_BY_NAME from "./acctionsType"
/* import axios from "axios"; */

export const getProductsFromServer  = (searchText) => {
    return async (dispatch) => {
        const productData = await axios.get(`https://pf-server-93lj.onrender.com/product?name=${searchText}`);
        dispatch(
            {
                type: GET_PRODUCTS_BY_NAME,
                payload: productData
            }
        )

    }
};

