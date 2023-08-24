import { applyMiddleware, createStore } from "redux"; // redux
import { composeWithDevTools } from "redux-devtools-extension"; // redux-devtools-extension
import thunk from "redux-thunk"; // redux-thunk
import  Reducer  from "./reducer";  // Reducer 


const store = createStore(
    Reducer, 
    composeWithDevTools(applyMiddleware(thunk)) // applyMiddleware(thunk) para que se puedan usar los thunks
    ); 


export default store;