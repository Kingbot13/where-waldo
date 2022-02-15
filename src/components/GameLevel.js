import React from "react";
import DropMenu from "./DropMenu";

const GameLevel = (props) => {
    return (
        <div>
            <img src={props.image} alt='' />
            <DropMenu />
        </div>
    )
}

export default GameLevel;