import React from "react";
import DropMenu from "./DropMenu";
import styled from "styled-components";

const StyledDiv = styled.div`
    position: relative;
    z-index: 0;
   
`

const GameLevel = (props) => {
    return (
        <StyledDiv>
            <img src={props.image} alt='' />
            <DropMenu />
        </StyledDiv>
    )
}

export default GameLevel;