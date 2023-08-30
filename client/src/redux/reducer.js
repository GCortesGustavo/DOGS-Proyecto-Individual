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
} from "./action-types";


//Estado inicial
const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    dogDetail: {},
}

const calculateAverage = (dog) => {
    const [ min, max ] = dog.split(" - ")
    const minimo = Number(min)
    const maximo = Number(max)
    let average = (minimo + maximo ) / 2;
    if(average === "NaN") {
        average = 100
    }
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
            // Se obtienen el detalle de cada raza seleccionada
            return{
                ...state,
                dogDetail: action.payload,
            }

        

        case ORDER_BY_NAME:
            //Ordenar los perros por nombre
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
            //filtro por api o db
            const allDogs = state.allDogs;
            const filterCreated = action.payload === "db" ? allDogs.filter(dog => dog.createdInDB) : allDogs.filter(dog => !dog.createdInDB)

            return {
                ...state,
                dogs: action.payload === "all" ? state.allDogs : filterCreated
            };
            

        case ORDER_BY_WEIGHT:
            //orden por peso
                const filterWeight =
                action.payload === "Max"
                    ? state.dogs.sort((a, b) => calculateAverage(b.weight) - calculateAverage(a.weight))
                    : state.dogs.sort((a, b) => calculateAverage(a.weight) - calculateAverage(b.weight));
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


        case POST_DOG:
            return{ ...state};

        default:
            return state; //Retorna el estado actual
    }
}


export default reducer;