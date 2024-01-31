import {GET_SEARCH_TEXT} from "./acctionsType";
import axios from "axios";

const setSearchText = (searchValue) => {
    return async (dispatch) => {
        const productData= await axios.get(`https://pf-server-93lj.onrender.com/product/name?name=${searchValue}`)
        console.log(productData);
        dispatch(
            {
                type: GET_SEARCH_TEXT,
                payload: productData
            }
        )
    }
};

export {
    setSearchText
}

