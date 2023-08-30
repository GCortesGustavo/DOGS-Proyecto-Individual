import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../../redux/actions";
import Styles from "./SearchBar.module.css"

const SearchBar = ({pagination}) => {
    const dispatch = useDispatch();
    const [searchDog, setSearchDog] = useState("");

    const handleInput = (event) => {
        setSearchDog(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchDog) {
            dispatch(getDogsName(searchDog))}
        setSearchDog("")
        pagination(1)
    }

    return(
        <div className={Styles.div}>
            <form onSubmit={handleSubmit} className={Styles.form}>
                <input 
                    className={Styles.input}
                    type="text" 
                    onChange={handleInput} 
                    value={searchDog} 
                    placeholder="Name of a dog..."/>
                <button type="submit" className={Styles.button}>Search</button>
            </form>
        </div>
    )
}

export default SearchBar