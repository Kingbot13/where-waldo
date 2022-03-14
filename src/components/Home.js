import React from "react";
import { Link } from "react-router-dom";
import { StyledImageContainer } from "./StyledImageContainer";
import styled from "styled-components";

const StyledDiv = styled.div`
    height: 75%;
    overflow: hidden;
`

const BorderDiv = styled.div`
    height: 24%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`

const Home = (props) => {
    return(
        <StyledLink to='play' >
        <StyledImageContainer>
            <StyledDiv>
                <img src={props.image} alt='' />
            </StyledDiv>
            <BorderDiv>
                Play!
            </BorderDiv>
        </StyledImageContainer>
        </StyledLink>
    )
}

export default Home;