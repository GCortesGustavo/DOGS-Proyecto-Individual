import React from "react"; 
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";

import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { filterCreateDog, 
    filterTemperament, 
    getAllDogs, 
    getAllTemperament,  
    orderByName, 
    orderByWeight } from "../../redux/actions";
import Pagination from "../Pagination/Pagination";
import Card from "../Card/Card";

const Home = () => {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs) || [];
    const allTemperaments = useSelector((state) => {return state.temperaments})
    const [orden, setOrden] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);


    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
        setDogsPerPage(8);
    }

    const currentDogs = allDogs.slice(
        (currentPage - 1) * dogsPerPage,
        currentPage * dogsPerPage
    )

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperament())
    }, [dispatch])

    const handleClick = () => {
        dispatch(getAllDogs());
        setCurrentPage(1);
        setOrden("");
    }

    const handlerFilterCreated = (event) => {
        dispatch(filterCreateDog(event.target.value))
        setCurrentPage(1)
    }

    const handlerFilterTemperament = (event) => {
        dispatch(filterTemperament(event.target.value))
        setCurrentPage(1)
    }

    const handlerFilterByName = (event) => {
        const selectedValue = event.target.value
        dispatch(orderByName(selectedValue))
        setCurrentPage(1)
        setOrden(`Ordenado de la ${selectedValue}`)
    }

    

    const handlerFilterByWeight = (event) => {
        dispatch(orderByWeight(event.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado de ${event.target.value}`)
    }


    return (
        <div>
            <header>
                    <div>
                        <Link to="/">
                            <button>Dog</button>
                        </Link>
                    </div>
                <div>
                    <div>
                        <button onClick={handleClick}>Reset</button>
                        <Link to="/dogcreate">
                            <button>Create DOG</button>
                        </Link>
                    </div>
                <div>
                    <SearchBar pagination={pagination} />
                    <div>
                        <select onChange={(event) => handlerFilterByName(event)}>
                            <option disabled value="Order" >Order by name</option>
                            <option key={3} value="A-Z">A-Z</option>
                            <option key={2} value="Z-A">Z-A</option>
                        </select>

                        

                        <select onChange={(event) => handlerFilterByWeight(event)}>
                            <option disabled value="Order" >Order by weight</option>
                            <option key={1} value="Max">Max</option>
                            <option key={2} value="Min">Min</option>
                        </select>

                        <select onChange={(event) => handlerFilterCreated(event)}>
                            <option disabled value="Order" >Order by created</option>
                            <option key={1} value="all">ALL</option>
                            <option key={2} value="created">Created</option>
                            <option key={3} value="api">api</option>
                        </select>

                        <select onChange={(event) => handlerFilterTemperament(event)}>
                            <option disabled value="Temperaments" >Temperaments</option>
                            <option key={1 + "e"} value="all">All</option>
                            {
                                allTemperaments.map(temp => (
                                    <option value={temp.name} key={temp.id}>{temp.name}</option>
                                    ))
                                }
                        </select>
                        {orden && <p>{orden}</p>}
                    </div>
                </div>
            </div>    
            </header>
            <Pagination dogsPerPage={dogsPerPage} allDogs={allDogs.length} pagination={pagination}/>
                <div>
                    {Object.keys(allDogs).length ?
                        <div>
                            {
                                currentDogs?.map((dog) => {
                                    return (
                                        <div key={dog.id}>
                                            <Card 
                                                id={dog.id} 
                                                image={dog.image} 
                                                name={dog.name} 
                                                temperament={dog.temperament} 
                                                weight={dog.weight} 
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div> : 
                            <div>
                                <h1>Loading...</h1>
                            </div>
                    }
                </div>
        </div>
    )
};

export default Home;