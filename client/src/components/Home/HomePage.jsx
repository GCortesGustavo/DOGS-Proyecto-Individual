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
import Styles from "./HomePage.module.css";
import Loading from "../Loading/Loading";



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
        setOrden(`Order by ${selectedValue}`)
    }

    

    const handlerFilterByWeight = (event) => {
        dispatch(orderByWeight(event.target.value))
        setCurrentPage(1)
        setOrden(`Order by ${event.target.value}`)
    }


    return (
        <div className={Styles.background}>
            <header className={Styles.Header}>
                <div>
                        <Link to="/">
                            <button className={Styles.buttonBack}>Doggy</button>
                        </Link>
                        </div>
                    <div className={Styles.filtross} >
                        <div className={Styles.botonesXd} >
                            <button onClick={handleClick} className={Styles.button}>Reset</button>
                            <Link to="/dogcreate">
                                <button className={Styles.button}>Create DOG</button>
                            </Link>
                        </div>
                        <SearchBar pagination={pagination} />
                        <div className={Styles.filtross}>
                                <div>
                                    <select className={Styles.select} onChange={(event) => handlerFilterByName(event)}>
                                        <option className={Styles.option} key={1} disabled value="Order" >Order by name</option>
                                        <option className={Styles.option} key={3} value="A-Z">A-Z</option>
                                        <option className={Styles.option} key={2} value="Z-A">Z-A</option>
                                    </select>

                                    <select className={Styles.select} onChange={(event) => handlerFilterByWeight(event)}>
                                        <option className={Styles.option} key={3} disabled value="Order" >Order by weight</option>
                                        <option className={Styles.option} key={1} value="Max">Max</option>
                                        <option className={Styles.option} key={2} value="Min">Min</option>
                                    </select>

                                    <select className={Styles.select} onChange={(event) => handlerFilterCreated(event)}>
                                        <option className={Styles.option} key={4} disabled value="Order" >Order by created</option>
                                        <option className={Styles.option} key={1} value="all">ALL</option>
                                        <option className={Styles.option} key={2} value="db">Created</option>
                                        <option className={Styles.option} key={3} value="api">api</option>
                                    </select>

                                    <select className={Styles.select} onChange={(event) => handlerFilterTemperament(event)}>
                                        <option className={Styles.option} key={2} disabled value="Temperaments">Temperaments</option>
                                        <option className={Styles.option} key={1 + "e"} value="all">All</option>
                                        {allTemperaments.map((temp, index) => (
                                            <option className={Styles.option} value={temp.name} key={index}>
                                                {temp.name}
                                            </option>
                                        ))}
                                    </select>
                                    {orden && <p className={Styles.orden}>{orden}</p>}
                        </div>
                    </div>
            </div>    
            </header>
                <div >
                    {Object.keys(allDogs).length ?
                        <div className={Styles.Cards}>
                            {
                                currentDogs?.map((dog) => {
                                    return (
                                        <div key={dog.id} className={Styles.Card} >
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
                                <Loading />
                            </div>
                    }
                    <Pagination  dogsPerPage={dogsPerPage} allDogs={allDogs.length} pagination={pagination}/>
                </div>
        </div>
    )
};

export default Home;