import React from "react";
import { Link } from "react-router-dom";
import Style from "./Landing.module.css";


const Landing = () => {
    return (
        <div className={Style.background}>
            <div className={Style.container} >
            <h1 className={Style.title}>DOGGYS APP</h1>
            <Link to="/home">
                <button className={Style.button} >HOME</button>
            </Link>
            </div>
        </div>
    )
}

export default Landing;