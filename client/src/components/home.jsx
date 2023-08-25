import React, { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [dogs, setDogs] = useState([]);


    function onSearch(name) {
        axios(`http://localhost:3001/http://localhost:3001/dogs/${name}`)
        .then(({ data }) => {
        if (data.name) {
            setDogs((oldDogs) => [...oldDogs, data]);
        } else {
            window.alert('¡No hay personajes con este Name!');
        }
        }).catch((error) => {
        window.alert(error)
        })
    }

    return (
        <div>
        <h1>ESTAS EN EL HOME</h1>
        <SearchBar onSearch={onSearch} />

        <div>
            <Link to="/Form">Create Dog</Link>

        </div>
        </div>
    )
};

export default Home;