import { GET_PRODUCTS_BY_NAME} from "./acctionsType"

const initialState={
    searchedProductsByName: "",
};

const rootReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_PRODUCTS_BY_NAME:
            return{...state, searchedProductsByName: action.payload} 

        default:
            return {...state}
    }
}


export default rootReducer;