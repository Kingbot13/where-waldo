import React from "react";
import DropMenu from "./DropMenu";
import styled from "styled-components";

const StyledDiv = styled.div`
    position: relative;
   
`

const GameLevel = ({image, imageClick, position, show, storeLocation, validate, correctSelections}) => {
    const [showButton, setShowButton] = React.useState(true);
    const [seconds, setSeconds] = React.useState(0);

    const buttonClick = () => {
        setShowButton(!showButton);
    }
    // keep track of player's time
    React.useEffect(() => {
        let interval;
        if (!showButton) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (correctSelections === 4 || (showButton && seconds !== 0)) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [showButton, seconds]);

    return (
        <StyledDiv onClick={(e)=> imageClick(e)} >
            <img src={image} alt='' useMap="#waldo-map" />
            <map name="waldo-map">
                <area onClick={(e)=>storeLocation(e)} shape="rect" coords="546,832,590,864" alt="wilma" />
                <area onClick={(e)=>storeLocation(e)} shape="rect" coords="1892,48,1947,112" alt="waldo" />
                <area onClick={(e)=>storeLocation(e)} shape="rect" coords="1819,710,1865,793" alt="odlaw" />
                <area onClick={(e)=>storeLocation(e)} shape="rect" coords="552,466,635,596" alt="wizard" />
            </map>
            {show && <DropMenu top={position.top} left={position.left} validate={validate} />}
            {showButton && <button onClick={buttonClick}>Start</button>}
        </StyledDiv>
    )
}

export default GameLevel;