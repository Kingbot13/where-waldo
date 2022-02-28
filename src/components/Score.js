import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

const Score = ({time}) => {
    return (
        <StyledDiv>
            Time: {time}
        </StyledDiv>
    )
}

export default Score;