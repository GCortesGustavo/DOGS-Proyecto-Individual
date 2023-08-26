import React from "react"; 
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
//import axios from "axios";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { filterCreateDog, filterTemperament, getAllDogs, getAllTemperament, getDogsName, orderByWeight } from "../../redux/actions";
import Pagination from "../Pagination/Pagination";
import Card from "../Card/Card";

const Home = () => {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs) || [];
    const allTemperaments = useSelector((state) => {return state.temperaments})
    const [orden, setOrden] = useState("")

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexLastDog = currentPage * dogsPerPage;
    const indexFirstDog = indexLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog)

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
        setDogsPerPage(8);
    }

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperament())
    }, [dispatch])

    const handleClick = (dog) => {
        window.location.reload(false)
    }

    const handlerFilterCreated = (dog) => {
        dispatch(filterCreateDog(dog.target.value))
        setCurrentPage(1)
    }

    const handlerFilterTemperament = (dog) => {
        dog.preventDefault();
        dispatch(filterTemperament(dog.target.value))
        setCurrentPage(1)
    }

    const handlerFilterByName = (dog) => {
        dispatch(getDogsName(dog.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${dog.target.value}`)
    }

    const handlerFilterByWeight = (dog) => {
        dispatch(orderByWeight(dog.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${dog.target.value}`)
    }
    // const [dogs, setDogs] = useState([]);
    // function onSearch(name) {
    //     axios(`http://localhost:3001/http://localhost:3001/dogs/${name}`)
    //     .then(({ data }) => {
    //     if (data.name) {
    //         setDogs((oldDogs) => [...oldDogs, data]);
    //     } else {
    //         window.alert('¡No hay personajes con este Name!');
    //     }
    //     }).catch((error) => {
    //     window.alert(error)
    //     })
    // }

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
                        <button onClick={dog => {handleClick(dog)}}>Reset</button>
                        <Link to="/dogcreate">
                            <button>Create DOG</button>
                        </Link>
                    </div>
                <div>
                    <SearchBar pagination={pagination} />
                    <div>
                        <select onChange={dog => handlerFilterByName(dog)} value="Select">
                            <option disabled value="Order" >Order by name</option>
                            <option key={1} value="A-Z">A-Z</option>
                            <option key={2} value="Z-A">Z-A</option>
                        </select>

                        <select onChange={dog => handlerFilterByWeight(dog)}>
                            <option disabled value="Order" >Order by weight</option>
                            <option key={1} value="weight">Max</option>
                            <option key={2} value="weight">Min</option>
                        </select>

                        <select onChange={dog => handlerFilterCreated(dog)}>
                            <option disabled value="Order" >Order by created</option>
                            <option key={1} value="all">ALL</option>
                            <option key={2} value="created">Created</option>
                            <option key={3} value="api">api</option>
                        </select>

                        <select onChange={dog => handlerFilterTemperament(dog)}>
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
                                // currentDogs?.map((dog) => {
                                //     return(
                                //         <div key={dog.id}>
                                //             {
                                //                 <Card key={dog.id} id={dog.id} image={dog.image} name={dog.name} temperament={dog.temperament} weight={dog.weight}/>
                                //             }    
                                //         </div>
                                //     )
                                // })
                                currentDogs?.map((dog) => {
                                    return (
                                        <div key={dog.id}>
                                            <Card id={dog.id} image={dog.image} name={dog.name} temperament={dog.temperament} weight={dog.weight} />
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
                    {/* <h1>ESTAS EN EL HOME</h1>
                    <SearchBar  /> */}
        </div>
    )
};

export default Home;