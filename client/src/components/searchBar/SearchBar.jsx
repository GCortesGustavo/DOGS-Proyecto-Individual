import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../../redux/actions";
//import { useHistory } from "react-router-dom";

// export default function SearchBar() {
//     const [name, setName] = useState("")

//     const handleChange = (event) => {
//         setName(event.target.value)
//     }

//     return(
//         <div>
//             <input type="search" onChange={handleChange} value={name} placeholder="Name of a dog..."/>
//             <button>Search</button>
//         </div>
//     )
// }

const SearchBar = ({pagination}) => {
    const dispatch = useDispatch();
    const [searchDog, setSearchDog] = useState("");
    //const history = useHistory();

    const handleInput = (dog) => {
        dog.preventDefault()
        searchDog(dog.target.value)
    }

    const handleSubmit = (dog) => {
        dog.preventDefault();
        if(searchDog) {
        dispatch(getDogsName(searchDog))}
        setSearchDog("")
        window.location.href ="/home"
        pagination(1)
    }

    return(
        <div>
            <form>
                <input type="text" onChange={dog => handleInput(dog)} value={searchDog} placeholder="Name of a dog..."/>
                <button type="submit" onClick={dog => handleSubmit(dog)}>Look for</button>
            </form>
        </div>
    )
}

export default SearchBar