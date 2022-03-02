import React from "react";

const Form = ({onChange, value}) => {
    return (
        <form >
            <label htmlFor="name">Name</label>
            <input name="name" id="name" onChange={(e) => onChange(e)} value={value} />
            <button>Submit</button>
        </form>
    )
}

export default Form;