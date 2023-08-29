import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    //getAllDogs, 
    clearDetail, 
    getDetail} from "../../redux/actions";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import style from "./detail.module.css";

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    
    useEffect(() => {
        if(id) {
            dispatch(getDetail(id));
        }
        return () => dispatch(clearDetail())
    }, [dispatch, id])
    
    const dog = useSelector((state) => state.dogDetail)

    return (
        <div className={style.detailContainer}>
            <div className={style.container}>
            <Link to="/home">
                <button className={style.homeButton}>Go home</button>
            </Link>  
            
        {Object.keys(dog) ? (
        <div className={style.dogDetails}>
            <img
            src={
                dog.image
                ? dog.image
                : (dog.image =
                    "https://www.helpguau.com/wp-content/uploads/2019/06/perro-buscando.jpg")
            }
            alt="perro"
            width="200"
            height="200"
            className={style.dogImage}
            />
        <div className={style.dogInfo}>
                <h1> Name : {dog.name}</h1>
                <h2> Life Span : {dog.life_span}</h2>
                <h2> Weight :{dog.weight} KG</h2>
                <h2> Height :{dog.height} CM</h2>
            <div className={style.temperament}>
                <h2>Temperaments :</h2>
                <h2>{dog?.temperament}</h2>
            </div>
        </div>
        </div>
        ) : (
        <div className={style.loading}>
            <Loading />
        </div>
    )}
    </div>
        </div>
    )
}

export default Detail