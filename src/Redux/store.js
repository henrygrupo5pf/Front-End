import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";


const store= createStore(rootReducer, compose(applyMiddleware(thunkMiddleware)));

export default store;