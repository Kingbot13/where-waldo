import React from "react";

const Card = ({name, time}) => {
    return (
        <div>
            {name} {time} seconds
        </div>
    )
}

export default Card;