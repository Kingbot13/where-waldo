import React from "react";
import { Link } from "react-router-dom";
import { StyledImageContainer } from "./StyledImageContainer";

const Home = (props) => {
    return(
        <Link to='play' >
        <StyledImageContainer>
            <div>
                <img src={props.image} alt='' />
            </div>
        </StyledImageContainer>
        </Link>
    )
}

export default Home;