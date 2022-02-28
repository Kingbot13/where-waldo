import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

`

const Score = ({time}) => {
    return (
        <StyledDiv>
            Time: {time} seconds!
        </StyledDiv>
    )
}

export default Score;