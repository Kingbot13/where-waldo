import React from "react";
import styled from "styled-components";
import Form from "./Form";

const StyledDiv = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    margin: auto;
    min-height: 10rem;
    max-height: 30rem;
    width: auto;

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