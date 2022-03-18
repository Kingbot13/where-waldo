import React from "react";
import styled from "styled-components";
import Form from "./Form";

const StyledDiv = styled.div`
    /* position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
    background-color: #fff;
    display: flex;
    flex-direction: column;
    margin: auto;
    height: 10rem;


`

const Score = ({time, handleChange, value, submitScore, showForm}) => {
    return (
        <StyledDiv>
            Time: {time} seconds!
            {showForm && <Form onChange={handleChange} value={value} onClick={submitScore} />}
        </StyledDiv>
    )
}

export default Score;