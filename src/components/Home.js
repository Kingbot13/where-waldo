import React from "react";
import { Link } from "react-router-dom";
import { StyledImageContainer } from "./StyledImageContainer";
import styled from "styled-components";

const StyledDiv = styled.div`
    height: 75%;
    overflow: hidden;
`

const Home = (props) => {
    return(
        <Link to='play' >
        <StyledImageContainer>
            <StyledDiv>
                <img src={props.image} alt='' />
            </StyledDiv>
            <div>
                Play!
            </div>
        </StyledImageContainer>
        </Link>
    )
}

export default Home;