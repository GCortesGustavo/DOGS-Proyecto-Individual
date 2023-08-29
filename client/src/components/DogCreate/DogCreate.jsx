import React from "react";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import validate from "./validate";
import { postDog, getAllTemperament } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./DogCreate.module.css"

const DogCreate = () => {
    const dispatch = useDispatch();
    const allTemperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        height_min: 0,
        height_max: 0,
        weight_min: 0,
        weight_max: 0,
        life_span: 0,
        image: "",
        temperament: []
    })
    
    const handleSelect = (event) => {
        const selectedValue = event.target.value
        if(!input.temperament.includes(selectedValue)){
            setInput({
                ...input,
                temperament: [...input.temperament, selectedValue]
            })
        }
    }


    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        });
        
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(input);
        setErrors(validationErrors);
        if(Object.keys(validationErrors).length === 0) {
            dispatch(postDog(input));
            alert("The dow was created")
            setInput({
                name: "",
                height_min: 0,
                height_max: 0,
                weight_min: 0,
                weight_max: 0,
                life_span: 0,
                image: "",
                temperament: []
            });
            window.location.href = "/home";
        }
    }

    const handleErase = (dog) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(tem => tem !== dog)
        })
    }

    useEffect(() => {
        dispatch(getAllTemperament())
    }, [dispatch])

    return (
        <div className={Styles.background}>
            <div className={Styles.container}>
            <h1>CREATE DOG</h1>
            <div>
                <Link to="/home">
                    <button>HOME</button>
                </Link>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>Name:</h3>
                        <input 
                            name="name"
                            required 
                            type="text" 
                            value={input.name} 
                            onChange={handleChange} 
                            placeholder="Type a name of dog"/>
                    </div>
                    <div>
                        <h3>Height min:</h3>
                        <input required 
                        name="height_min"
                        min="0" 
                        type="number" 
                        value={input.height_min} 
                        onChange={handleChange}/>
                        
                        <h3>Height Max:</h3>
                        <input required 
                        name="height_max"
                        min="0" 
                        type="number" 
                        value={input.height_max} 
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <h3>Weight Min:</h3>
                        <input 
                        required 
                        name="weight_min"
                        min="0" 
                        type="number" 
                        value={input.weight_min} 
                        onChange={handleChange}/>

                        <h3>Weight Max:</h3>
                        <input 
                        required 
                        name="weight_max"
                        min="0" 
                        type="number" 
                        value={input.weight_max} 
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <h3>Life Span:</h3>
                        <input required 
                        name="life_span"
                        min="0" 
                        type="number" 
                        value={input.life_span} 
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <h3>Image:</h3>
                        <input  
                        name="image" 
                        type="url" 
                        value={input.image} 
                        onChange={handleChange}/>
                    </div>
                    <div></div>
                    <div>
                        <h3>TEMPERAMENTS</h3>
                        <select onChange={handleSelect}>
                            <option value="all" disabled key="temp" >
                                Temperaments
                            </option>
                            {
                            allTemperaments.map((t) => {
                            return (
                                <option value={t.name} key={t.id}>{t.name}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    {
                        errors && 
                        (errors.name ||
                        errors.height_min ||
                        errors.height_max ||
                        errors.weight_min ||
                        errors.weight_max ||
                        errors.life_span||
                        !input.name.length ||
                        input.height <=0 ||
                        input.weight <= 0||
                        input.life_span <= 0 ||
                        !input.temperament.length) 
                        ?
                        <div>The dog cant be Created Yed</div>
                        :
                        <button type="submit"> Create</button>
                    }
                    {/* {Object.keys(errors).length > 0 ? (
                        <div>The dog can't be created yet</div>
                        ) : (
                        <button type="submit"> Create</button>
                    )} */}
                </form>
                    <div>
                        {input.temperament.map((d, i) => {
                            return (
                                <div key={i++}>
                                    <div>
                                        {d}
                                    </div>
                                    <button onClick={() => handleErase(d)}>X</button>
                                </div>
                            )
                        })}
                    </div>


                    <div>
                        <h2>ERRORS:</h2>
                    </div>
                    <div>
                        <h2>{errors.name && (<p>{errors.name}</p>)}</h2>
                        <h2>{errors.height_min && (<p>{errors.height_min}</p>)}</h2>
                        <h2>{errors.height_max && (<p>{errors.height_max}</p>)}</h2>
                        <h2>{errors.weight_min && (<p>{errors.weight_min}</p>)}</h2>
                        <h2>{errors.weight_max && (<p>{errors.weight_max}</p>)}</h2>
                        <h2>{errors.life_span && (<p>{errors.life_span}</p>)}</h2>
                        <h2>{errors.temperament && (<p>{errors.temperament}</p>)}</h2>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default DogCreate;