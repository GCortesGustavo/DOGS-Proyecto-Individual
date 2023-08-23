import { useState } from "react";

export default function SearchBar() {
    const [name, setName] = useState("")

    const handleChange = (event) => {
        setName(event.target.value)
    }

    return(
        <div>
            <input type="search" onChange={handleChange} value={name} placeholder="Name of a dog..."/>
            <button>Search</button>
        </div>
    )
}