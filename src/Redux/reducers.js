import {GET_SEARCH_TEXT} from "./acctionsType"

const initialState={
    searchText:""
};



const rootReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_SEARCH_TEXT:
            return {...state, searchText: action.payload}
            
        default:
            return {...state}
    }
}


export default rootReducer;