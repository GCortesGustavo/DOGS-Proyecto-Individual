import { applyMiddleware, createStore } from "redux"; 
import { composeWithDevTools } from "redux-devtools-extension"; 
import thunk from "redux-thunk"; 
import  Reducer  from "./reducer";   


const store = createStore(
    Reducer, 
    composeWithDevTools(applyMiddleware(thunk)) // applyMiddleware(thunk) para que se puedan usar los thunks
    ); 


export default store;