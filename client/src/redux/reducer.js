import { 
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENT,
    GET_DOGS_NAME,
    GET_DETAIL,
    FILTER_TEMPERAMENT,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    POST_DOG,
    //DELETE_DOG,
    CLEAR_DETAIL
} from "./action-types";


//Estado inicial
const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    dogDetail: [],
}

const calculateAverage = (dog) => {
    const [min, max ] = dog.split(" - ")
    const average = (min + max ) / 2;
    return average
}

//REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                dogs: action.payload,
            };
        
        case GET_ALL_TEMPERAMENT:
            return {
                ...state,
                temperaments: action.payload,
            }

        case GET_DOGS_NAME:
            return{
                ...state,
                dogs: action.payload,
            }
            
        case GET_DETAIL:
            // Se obtienen la descripcion de cada raza seleccionada
            return{
                ...state,
                dogDetail: action.payload,
            }



        // case DELETE_DOG:
        //   return {
        //     ...state,
        //     dogs: state.dogs.filter(e => e.id !== action.payload)
        //   }
        

        case ORDER_BY_NAME:
            //Ordenar los perros por nombre
            console.log(action.payload);
            const filterDogs = action.payload === "A-Z" ? state.dogs.sort((a,b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0
            })
            : state.dogs.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0
            });
            return{
                ...state,
                dogs: filterDogs,
            };
            

        case FILTER_CREATED:
            //orden por api o db
            const allDogs = state.allDogs;
            const filterCreated = action.payload === "created" ? allDogs.filter(dog => dog.createdInDb) : allDogs.filter(dog => !dog.createInDb)

            return {
                ...state,
                dogs: action.payload === "all" ? state.allDogs : filterCreated
            };
            
        case ORDER_BY_WEIGHT:
            //orden por peso
                const dogs = state.allDogs.filter((dog) => dog.weight);
                const filterWeight =
                action.payload === "Max"
                    ? dogs.sort((a, b) => calculateAverage(b.weight) - calculateAverage(a.weight))
                    : dogs.sort((a, b) => calculateAverage(a.weight) - calculateAverage(b.weight));
                return {
                ...state,
                dogs: filterWeight,
                };


        case FILTER_TEMPERAMENT:
            //filtrar x temperamento
            const allDogs2 = state.allDogs;
            const filteredTemp = action.payload === "All" ? allDogs2 : allDogs2.filter(element => {
                return element.temperament?.includes(action.payload)
            })

            return{
                ...state,
                dogs: filteredTemp
            }

        case CLEAR_DETAIL: {
            return{
                ...state,
                dogDetail: {}
            }
        }    

        case POST_DOG:
            return{ ...state};

        default:
            return state; //Retorna el estado acutal
    }
}


export default reducer;