import React from "react";
import DropMenu from "./DropMenu";
import Score from "./Score";
import Leaderboard from './Leaderboard';
import GameMsg from "./GameMsg";
import styled from "styled-components";
import {collection, addDoc, getFirestore, getDocs, deleteDoc, doc} from "firebase/firestore";
import { Button } from "./Button";

const StyledDiv = styled.div`
    position: relative;
   
`

const ScoreContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    min-height: 30vh;
    min-width: 30vw;
    border-radius: 10px;
    box-shadow: 0 1px 15px 0 black;
    align-items: center;

    & button:hover {
        border-color: red;
        color: red;

    }
    
    & button {
        height: 3rem;
        width: 6rem;
        border: 2px solid #cacaca;
        transition: border-color 1s, color 1s;
        background-color: #fff;

    }

    & form input:focus {
        outline-color: #599FBD;
    }

    & form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 70%;
        margin: auto;
    }
    /* leaderboard */
    & ol {
        min-height: 75vh;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

`


const MainImg = styled.img`
    width: 95vw;
    height: auto;
`

const GameLevel = ({
    image, 
    imageClick, 
    position, 
    show, 
    storeLocation, 
    validate, 
    correctSelections, 
    characterLocation, 
    showMsg, 
    isCorrect,
    getImgSize,
    toggleIsGameStart,
    isGameStart,
}) => {
    const [showButton, setShowButton] = React.useState(true);
    const [showForm, setShowForm] =React.useState(true);
    const [seconds, setSeconds] = React.useState(0);
    const [showScore, setShowScore] = React.useState(false);
    const [leaderboard, setLeaderboard] = React.useState([]);
    const [value, setValue] = React.useState('');
    const [showLeaderboard, setShowLeaderboard] = React.useState(false);
    const [copyCharacterLocations, setCopyCharacterLocations] = React.useState([]);


    const buttonClick = () => {
        setShowButton(!showButton);
        toggleIsGameStart();
    }
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    // keep track of player's time
    React.useEffect(() => {
        let interval;
        if (!showButton && correctSelections < 4 && isGameStart) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (correctSelections === 4 || (showButton && seconds !== 0)) {
            setShowScore(true);
            clearInterval(interval);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [showButton, seconds, correctSelections]);
    // get leaderboard from firestore
    React.useEffect(() => {
        getLeaderboard();
    },[]);

    React.useEffect(() => {
        setCopyCharacterLocations([...characterLocation]);
        // console.log(copyCharacterLocations);
        
    },[characterLocation]);

    const areas = copyCharacterLocations.map((item) => {
        // console.log(item);
        return <area key={item.name} onClick={(e) => storeLocation(e)} coords={item.coords} shape='rect' alt={item.name} />
    });


    // add highscore to leaderboard collection in database
    const submitScore = (e) => {
        e.preventDefault();
        const sortedScores = leaderboard.sort((a, b) => a.time - b.time);
        if (leaderboard.length === 10 && seconds < sortedScores[sortedScores.length - 1]) {
            updateHighScore();
        } else {
            addHighScore();
            setShowLeaderboard(true);
            e.target.removeEventListener('click', submitScore);
            setShowForm(false);

        }
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

    const updateHighScore = async () => {
        try {
            const sortedScores = leaderboard.sort((a, b) => a.time - b.time);
            const lowestScore = sortedScores[sortedScores.length - 1];
            await deleteDoc(doc(getFirestore(), 'leaderboard', lowestScore));
            addHighScore();
            setShowLeaderboard(true);

        } catch(err) {
            console.error(err);
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
            <MainImg onLoad={(e) => getImgSize(e)} src={image} alt='' useMap="#waldo-map" />
            <map name="waldo-map">
                {areas}
            </map>
            {show && !showButton && <DropMenu top={position.top} left={position.left} validate={validate} />}
            {showButton && <Button onClick={buttonClick}>Start</Button>}
            
            {showScore && 
            <ScoreContainer>
                <Score time={seconds} leaderboard={leaderboard} showForm={showForm} handleChange={handleChange} value={value} submitScore={submitScore} />
                {(showLeaderboard || leaderboard.length === 10) && <Leaderboard highScores={leaderboard} />}
            </ScoreContainer>}
        </StyledDiv>
    )
}

export default GameLevel;