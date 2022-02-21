import React from "react";
import DropMenu from "./DropMenu";
import styled from "styled-components";

const StyledDiv = styled.div`
    position: relative;
   
`

const GameLevel = ({image, imageClick, position, show}) => {
    return (
        <StyledDiv onClick={(e)=> imageClick(e)} >
            <img src={image} alt=''  />
            {show && <DropMenu top={position.top} left={position.left} />}
        </StyledDiv>
    )
}

export default GameLevel;