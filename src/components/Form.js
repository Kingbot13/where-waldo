import React from "react";




const Form = ({onChange, value, onClick}) => {
    return (
        <form >
            <label htmlFor="name"> Please enter your name</label>
            <input name="name" id="name" type='text' onChange={(e) => onChange(e)} value={value} />
            <button onClick={(e) => onClick(e)}>Submit</button>
        </form>
    )
}

export default Form;