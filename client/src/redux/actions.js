import axios from "axios";
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


//Obtener
//const URL = "http://localhost:3001"
// Action para obtener datos desde el back el cual esta corriendo en el puerto 3001
export const getAllDogs = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs`);
            const dogs = response.data;
            dispatch({
            type: GET_ALL_DOGS,
            payload: dogs,
            });
        } catch (error) {
            console.log(error);
        }
    };
}


export const getAllTemperament = () => {
    // Obtengo todos los temperamentos de mi back
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/temperament`)
        return dispatch({
            type : GET_ALL_TEMPERAMENT,
            payload: json.data
        })
    }
}

export const getDogsName = (name) => {
    //obtener todos los perros que coincidan con el nombre que pasamos por parametro
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/name?name=${name}`)
            return dispatch({
                type: GET_DOGS_NAME,
                payload: json.data
            })
        } catch (error) {
            alert("The dog could no be found")
        }
    }
}


export const getDetail = (id) => {
    // Enviar el id al reducer para crear la seccion de Description
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`)
            
            const data= response.data
            return dispatch ({
                type: GET_DETAIL,
                payload: data
            })
        }
        catch(error) {
            console.log("Error fetching dog details:",error);
        }
    }
}


//para crear un nuevo perro
export const postDog = (data) => {
        return async function (dispatch) {
            try {
                const posted = await axios.post('http://localhost:3001/dogs', data)
                return dispatch({
                    type: POST_DOG,
                    payload: posted.data
                })
            } catch (error) {
                console.log(error);
            }
            
        }
};


export function orderByWeight(payload){
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload: payload
    }
}

export const filterTemperament = (temperament) => {
    return {
        type: FILTER_TEMPERAMENT,
        payload: temperament
    }
}

export const filterCreateDog = (payload) => {
    return{
        type: FILTER_CREATED,
        payload
    }
}



