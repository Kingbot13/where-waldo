import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    position: fixed;
    z-index: 1;
    top: 10%;
    left: 50%;
    transform: translate(-50%);
    background-color: ${props => props.isCorrect ? "green" : "red"};
    border-radius: 50px;
    width: auto;
    height: auto;
    padding: 1rem 2rem;
    visibility: ${props => props.show ? "visable" : "hidden"};
    transition: visibility 0.5s;
`

const GameMsg = ({show, isCorrect}) => {
    return (
        <StyledDiv show={show} isCorrect={isCorrect} >
            {isCorrect ? "Correct!" : "Wrong, try again!"}
        </StyledDiv>
    );
}

export default GameMsg;