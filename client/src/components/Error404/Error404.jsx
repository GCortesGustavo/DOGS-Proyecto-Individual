import React from "react";
import { Link } from "react-router-dom";
import style from "./Error404.module.css";

const Error404 = () => {
    return (
        <div className={style.errorContainer}>
            <img className={style.errorImage} src="https://st1.uvnimg.com/dims4/default/5c47cba/2147483647/thumbnail/1024x576/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fp%2Fperro_deprimido_3.jpg" alt="Error404"/>
            <h1 className={style.errorMessage}>Page not found</h1>
            <Link to="/home" className={style.homeLink}>
                <button className={style.homeButton}>Back Home</button>
            </Link>
        </div>
    )
}

export default Error404;