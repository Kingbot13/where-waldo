import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
    return(
        <Link to='play' >
        <div>
            <div>
                <img src={props.image} alt='' />
            </div>
        </div>
        </Link>
    )
}

export default Home;