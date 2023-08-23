import { FILTER, ORDER } from "./action-types"

const initialState = {
    myDogFavorites : [],
    allDogsFavorites : [],
}
const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case FILTER:
            const allCharactersFiltered = state.allCharactersFav.filter(
            (character) => character.gender === payload
            );
            return {
            ...state,
            myFavorites: payload === 'allCharacters' ? [...state.allCharactersFav] : allCharactersFiltered
            };
    
        case ORDER:
            const allCharactersCopy = [...state.allCharactersFav];
            return {
            ...state,
            myFavorites: payload === 'A' 
            ? allCharactersCopy.sort((a, b) => a.id - b.id)
            : allCharactersCopy.sort((a, b) => b.id - a.id)
            };
    
        default:
            return state;
        }


}


export default reducer;