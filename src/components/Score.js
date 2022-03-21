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
    max-height: 10rem;
    & p {
        font-size: 30px;
        font-weight: bold;
    }


`

const Score = ({time, handleChange, value, submitScore, showForm, leaderboard}) => {
    return (
        <StyledDiv>
            <p>Time: {time} seconds!</p>
            {showForm && (leaderboard !==10 || leaderboard.find(item => item.data.time > time)) && <Form onChange={handleChange} value={value} onClick={submitScore} />}
        </StyledDiv>
    )
}

export default Score;