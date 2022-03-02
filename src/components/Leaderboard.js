import React from "react";
import Card from "./Card";

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