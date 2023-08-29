import React from "react";
import Styles from "./Pagination.module.css"

const Pagination = ({dogsPerPage, allDogs, pagination}) => {
    const pageNumbers= [];

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav >
            <ul className={Styles.container}>
                {
                    pageNumbers?.map((number) => {
                        return(
                            <li className={Styles.point}key={number}>
                                <button className={Styles.button} onClick={() => pagination(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Pagination