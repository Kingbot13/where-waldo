import React from "react";
import Card from "./Card";
import styled from "styled-components";

const StyledDiv = styled.div`
    background-color: #fff;
    position: absolute;
    
`

const Leaderboard = ({highScores}) => {
    const cards = highScores.map((item) => {
        return <Card name={item.data.name} time={item.data.time} key={item.id} />
    })
    return (
        <div>
            {cards}
        </div>
    )
}

export default Leaderboard;