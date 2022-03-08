import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    position: fixed;
    z-index: 1;
    top: 10%;
    left: 50%;
    transform: translate(-50%);
    background-color: #fff;
    border-radius: 50px;
    width: auto;
    height: auto;
    padding: 1rem 2rem;
`

const GameMsg = () => {
    return (
        <StyledDiv>
            Placeholder
        </StyledDiv>
    );
}

export default GameMsg;