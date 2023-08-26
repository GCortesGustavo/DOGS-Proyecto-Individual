import React from "react";
import { useEffect } from "react";
//import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
//import {useParams} from "react-router-dom";
import {getAllDogs, clearDetail} from "../../redux/actions";
import { Link } from "react-router-dom";

const Detail = (props) => {
    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dogDetail)
    //const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(getAllDogs(props.match.params.id));
        return dispatch(clearDetail())
    }, [dispatch, props.match.params.id]);

    return (
        <div>
            <Link to="/home">
                <button>Go home</button>
            </Link>  
        {Object.keys(dog).length ? 
        <div>
                <img src={dog[0].image ? dog[0].image : dog[0].image = "https://www.nextdayflyers.com/blog/wp-content/uploads/2014/10/Pet-Flyer-1-768x1024.jpg"} alt="woof" width="400" height="400" />
        <div>
        
        <h1> Name : {dog[0].name}</h1>
        <h2> Life Temp : {dog[0].life_Stamp}</h2>
        <h2> Weight :{dog[0].weight} KG</h2>
        <h2> Height :{dog[0].height} CM</h2>
        <div>
        <h2>Temperaments :</h2>
        <h2>{dog[0].temperament}</h2>
        </div>
        </div>

    </div>
                : <div> <h1>LOADING...</h1> </div> }
        </div>
    )
}

export default Detail