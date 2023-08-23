import React from "react";
import { Link } from "react-router-dom";
// import {style} from "./Landing.module.css";


const Landing = () => {
    return (
        <div>
            <h1>Welcome to my proyect</h1>
            <img src="https://hips.hearstapps.com/hmg-prod/images/schnauzer-dog-close-up-1616428226.jpg?crop=0.526xw:0.789xh;0.167xw,0.132xh&resize=1200:*" alt="Imagen representativa" />
            <Link to="/home">
                <button  >HOME</button>
            </Link>
        </div>
    )
}

export default Landing;