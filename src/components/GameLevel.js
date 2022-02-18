import React from "react";
import DropMenu from "./DropMenu";
import styled from "styled-components";

const StyledDiv = styled.div`
    position: relative;
    z-index: 0;
   
`

const GameLevel = ({image, imageClick, position, show}) => {
    return (
        <StyledDiv>
            <img src={image} alt='' onClick={(e)=> imageClick(e)} />
            {show && <DropMenu top={position.top} left={position.left} />}
        </StyledDiv>
    )
}

export default GameLevel;