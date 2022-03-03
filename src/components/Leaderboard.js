import React from "react";
import Card from "./Card";
import styled from "styled-components";



const Leaderboard = ({highScores}) => {
    highScores.sort((a, b) => a.data.time - b.data.time);
    const cards = highScores.map((item) => {
        return <li><Card name={item.data.name} time={item.data.time} key={item.id} /></li>
    });
    return (
        <ol>
            {cards}
        </ol>
    );
}

export default Leaderboard;