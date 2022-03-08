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
    visibility: ${props => props.show ? "visable" : "hidden"};
`

const GameMsg = ({show, isCorrect}) => {
    return (
        <StyledDiv show={show} >
            {isCorrect ? "Correct!" : "Wrong, try again!"}
        </StyledDiv>
    );
}

export default GameMsg;