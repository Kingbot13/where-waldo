import React from "react";
import styled from "styled-components";
import Form from "./Form";

const StyledDiv = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

`

const Score = ({time, handleChange, value, addHighScore}) => {
    return (
        <StyledDiv>
            Time: {time} seconds!
            <Form onChange={handleChange} value={value} onClick={addHighScore} />
        </StyledDiv>
    )
}

export default Score;