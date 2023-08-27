import React from "react";
import { Link } from "react-router-dom";
//import { useDispatch } from "react-redux";

const Card = ({image, name, temperament, weight, id}) => {
    return (
        <div>
            <div>
                <img src={image} alt={`${name}`} height="250px" width="200px"/>
            </div>

            <div>
                <div>
                    <Link to={`/detail/${id}`}> 
                    <h3>{name}</h3>
                    </Link>
                    <h2>{temperament}</h2>
                    <h2>{weight}kg</h2>
                </div>
            </div>
        </div>
    )
}


export default Card