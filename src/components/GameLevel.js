import React from "react";
import DropMenu from "./DropMenu";
import Score from "./Score";
import Leaderboard from './Leaderboard';
import GameMsg from "./GameMsg";
import styled from "styled-components";
import {collection, addDoc, getFirestore, getDocs} from "firebase/firestore";

const StyledDiv = styled.div`
    position: relative;
   
`

const ScoreContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
`

const StartButton = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    height: 4rem;
    width: 8rem;
    border-radius: 50px;
    font-size: 25px;
    &:hover {
        height: 4.5rem;
        width: 9rem;
        font-size: 30px;
    }
    transition: height 0.5s, width 0.5s, font-size 0.5s;
`

const MainImg = styled.img`
    width: 95vw;
    height: auto;
`

const GameLevel = ({image, imageClick, position, show, storeLocation, validate, correctSelections, characterLocation, showMsg, isCorrect}) => {
    const [showButton, setShowButton] = React.useState(true);
    const [seconds, setSeconds] = React.useState(0);
    const [showScore, setShowScore] = React.useState(false);
    const [leaderboard, setLeaderboard] = React.useState([]);
    const [value, setValue] = React.useState('');
    const [showLeaderboard, setShowLeaderboard] = React.useState(false);

    const areas = characterLocation.map((item) => {
        return <area key={item.name} onClick={(e) => storeLocation(e)} coords={item.coords} shape='rect' alt={item.name} />
    });

    const buttonClick = () => {
        setShowButton(!showButton);
    }
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    // keep track of player's time
    React.useEffect(() => {
        let interval;
        if (!showButton && correctSelections < 4) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (correctSelections === 4 || (showButton && seconds !== 0)) {
            setShowScore(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [showButton, seconds, correctSelections]);
    // get leaderboard from firestore
    React.useEffect(() => {
        getLeaderboard();
    },[]);

    // add highscore to leaderboard collection in database
    const submitScore = (e) => {
        e.preventDefault();
        addHighScore();
        setShowLeaderboard(true);
        e.target.removeEventListener('click', submitScore);
    }

    const addHighScore = async () => {
        const docRef = await addDoc(collection(getFirestore(), 'leaderboard'), {
            name: value,
            time: seconds
        });
        try {
            console.log(docRef.id);
        } catch(err) {
            console.error('could not save data', err);
        }
    }

    const getLeaderboard = async () => {
        const db = getFirestore();
        const dataArray = [];
        const data = await getDocs(collection(db, 'leaderboard'));
        if (data) {
            data.docs.forEach(doc => dataArray.push({id: doc.id, data: doc.data()}));
            setLeaderboard(dataArray);
        };
    };

    return (
        <StyledDiv onClick={(e)=> imageClick(e)} >
            <GameMsg show={showMsg} isCorrect={isCorrect} />
            <MainImg src={image} alt='' useMap="#waldo-map" />
            <map name="waldo-map">
                {/* <area onClick={(e)=>storeLocation(e)} shape="rect" coords="546,832,590,864" alt="wilma" />
                <area onClick={(e)=>storeLocation(e)} shape="rect" coords="1892,48,1947,112" alt="waldo" />
                <area onClick={(e)=>storeLocation(e)} shape="rect" coords="1819,710,1865,793" alt="odlaw" />
                <area onClick={(e)=>storeLocation(e)} shape="rect" coords="552,466,635,596" alt="wizard" /> */}
                {areas}
            </map>
            {show && <DropMenu top={position.top} left={position.left} validate={validate} />}
            {showButton && <StartButton onClick={buttonClick}>Start</StartButton>}
            
            {showScore && 
            <ScoreContainer>
                <Score time={seconds} handleChange={handleChange} value={value} submitScore={submitScore} />
                {showLeaderboard && <Leaderboard highScores={leaderboard} />}
            </ScoreContainer>}
        </StyledDiv>
    )
}

export default GameLevel;