import { 
    GET_ALL_DOGS,
    GET_DESCRIPTION,
    GET_DOGS_FOR_NAME,
    GET_ALL_TEMPERAMENT,
    POST_DOG,
    //DELETE_DOG,
    ADD_FAV,
    DELETE_FAV,
    SET_LOADING,
    ERROR,
    GET_CLEAN,
    FILTER_TEMPERAMENT,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    DELETE_DOG,
} from "./action-types";


//Estado inicial
const initialState = {
    allDogs : [], //Es el array de perros
    dogsFilter : [], //Array de perros filtrados
    temperament: [], //Array de temperamentos,
    dogDescription : [],
    fav: [], // Perros fav,
    loading: true,
    error: false,
}

//REDUCER
const reducer = (state = initialState, action) => {
    let fd = []; //fd:FILTERED DOGS Array auxiliar para guardar los perros filtrados

    switch (action.type) {
        //Obtener los dogs de la API como la base de datos 
        case GET_ALL_DOGS:
            fd = action.payload; //Obtengo el Array
            return {
                ...state,
                allDogs: action.payload,
                dogsFilter: fd,
                loading: false,
            }
        
        case GET_ALL_TEMPERAMENT:
            //Se obtienen todos los temperamentos
            return {
                ...state,
                temperament: action.payload
            }
            
        case GET_DESCRIPTION:
            // Se obtienen la descripcion de cada raza seleccionada
            return{
                ...state,
                dogDescription: action.payload, // Obtengo el perro seleccionado
                loading: false,
                error: false
            }

        case POST_DOG:
            return{ ...state};
        
        case DELETE_DOG:
            return{...state};
        
        case ADD_FAV:
            return{
                ...state,
                fav: [...state.fav, action.payload]
            };
        
        case DELETE_FAV:
            return{
                ...state,
                fav: state.fav.filter((dog) => dog.id !== action.payload.id)
            };

        case GET_DOGS_FOR_NAME:
            //Filtrar perros por nombre
            fd = state.payload === ""
            ? state.allDogs
            : state.allDogs.filter(dog => dog.name.toLowerCase().includes(action.playload.toLowerCase())) //Obtengo el array de dogs filtrados

            return {
                ...state,
                dogsFilter: fd,
                loading: false,
            }

        case FILTER_TEMPERAMENT:
            fd = action.payload === "all"
            ? state.allDogs
            : state.allDogs.filter(dog => {
                if(!dog.temperament) return undefined;
                return dog.temperament.includes(action.payload)
            })

            return{
                ...state,
                dogsFilter: fd
            }

        case ORDER_BY_NAME:
            //Ordenar los perros por nombre
            if(action.payload === "asc") {
                fd = state.dogsFilter.sort((a, b) => { //Sort ordena los elementos de un array
                    if(a.name < b.name) return -1; //Si el nombre de A es menor que el de B, A va antes que B
                    if(a.name > b.name) return 1; //Si el nombre de A es mayor que el de B, A va despues que B
                    return 0;
                })
            }else {
                fd = state.dogsFilter.sort((a, b) => {
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                })
            }

            return{
                ...state,
                dogsFilter: fd
            }

        case ORDER_BY_WEIGHT:
            if(action.payload === "min") {
                fd = state.dogsFilter.sort((a, b) => {
                    if(a.weight < b.weight) return -1;
                    if(a.weight > b.weight) return 1;
                    return 0
                })
            } else {
                fd = state.dogsFilter.sort((a, b) => {
                    if(a.weight < b.weight) return -1;
                    if(a.weight > b.weight) return 1;
                    return 0
                })
            }

            return {
                ...state,
                dogsFilter: fd
            }

        case FILTER_CREATED:
            if(action.payload === "all"){ // si el filtro es all, muestro todos los perros
                fd = state.allDogs; 
            } else if(action.payload === "api"){
                fd = state.allDogs.filter((dog) => {
                    if(dog.createdInBd === false) return false; // si el perro fue creado por la api lo muestro TIENE UN WARNING
                })
            } else {
                fd = state.allDogs.filter((dog) => {
                    if(dog.createdInBd === true) return true; // si el perro fue creado por la api lo muestro TIENE UN WARNING
                })
            } 
            return{
                ...state,
                dogsFilter: fd
            }

        case GET_CLEAN:
            //limpia el estado
            return{
                ...state,
                dogDescription: action.payload
            }
            
        
        case SET_LOADING:
            return{
                ...state,
                loading: true
            }

        case ERROR:
            return{
                ...state,
                error: true,
            }
        default:
            return state; //Retorna el estado acutal
    }
}


export default reducer;