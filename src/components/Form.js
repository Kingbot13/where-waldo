import React from "react";

const Form = () => {
    return (
        <form >
            <label htmlFor="name">Name</label>
            <input name="name" id="name"/>
            <button>Submit</button>
        </form>
    )
}

export default Form;