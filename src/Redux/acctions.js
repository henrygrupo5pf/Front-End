import axios from "axios";

const setSearchText = (searchValue) => {
    return async (dispatch) => {
        const productData= await axios.get(`https://pf-server-93lj.onrender.com/product/name?name=${searchValue}`);
        
    }
};

export {
    setSearchText
}