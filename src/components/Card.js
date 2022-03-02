import React from "react";

const Card = ({name, time}) => {
    return (
        <div>
            Name: {name}
            Score: {time} seconds
        </div>
    )
}

export default Card;