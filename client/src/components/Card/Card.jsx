import React from "react";
import { Link } from "react-router-dom";
import Styles from "./Card.module.css"


const Card = ({image, name, temperament,  weight, id}) => {
    return (
        <div>
            <div>
                <img 
                className={Styles.image} 
                src={image} 
                alt={`${name}`} 
                height="250px" 
                width="200px"
                onError={(e) => {
                    e.target.src= "https://media.vandalsports.com/i/1200x1200/8-2023/2023822115940_1.jpg";
                    e.target.onError = null;
                    e.preventDefault()
                }}
                />
            </div>

            <div>
                <div >
                    <Link to={`/home/detail/${id}`}> 
                    <h3 className={Styles.titulo}>{name}</h3>
                    </Link>
                    <h2>{weight}kg</h2>
                    <h2>{temperament? temperament.join(", ") : "[temperamentos]"}</h2>
                </div>
            </div>
        </div>
    )
}


export default Card