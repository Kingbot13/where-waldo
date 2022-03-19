import getFirebaseConfig from './firebase-config';
import {initializeApp} from 'firebase/app';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import {collection, getDocs, getFirestore} from 'firebase/firestore';
import './App.css';
import Home from './components/Home';
import GameLevel from './components/GameLevel';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  margin: auto;
  justify-content: space-between;
`

const StyledH1 = styled.h1`
  text-decoration: none;
  color: red;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledHeader = styled.header`
  box-shadow: 0 1px 15px 0 #cacaca;
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

function App() {
  const [mainImg, setMainImg] = React.useState([]);
  const [showMenu, setShowMenu] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState({
    top: 0,
    left: 0
  });
  // store location of clicked area tag to compare to character locations
  const [currentLocation, setCurrentLocation] = React.useState('');
  const [characterLocation, setCharacterLocation] = React.useState([]);
  // track number of correct selections made by player
  const [correctSelections, setCorrectSelections] = React.useState(0);
  const [isGameStart, setIsGameStart] = React.useState(false);
  // to use to toggle character selection message
  const [showMsg, setShowMsg] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(true);
  const [imgDimensions, setImageDimensions] = React.useState({
    height: 0,
    width: 0,
  });

  // fetch main image
  React.useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, 'wheres-waldo-main.jpg'))
    .then(url => setMainImg([url]))
    .catch(error => console.error('image not retrieved from database', error));
  }, []);

  const getImgSize = (e) => {
    setImageDimensions({
      height: e.target.height,
      width: e.target.width,
    });
  }

  React.useEffect(() => {
    const image = document.querySelector('img');
    const handleImgResize = () => {
      setImageDimensions({
        height: image.height,
        width: image.width,
      });
    }
    window.addEventListener('resize', handleImgResize);

    return () => window.removeEventListener('resize', handleImgResize);
  })
  // dynamically set coordinates to use with area elements
  const setCoords = () => {
    console.log("img height", imgDimensions.height, "img width", imgDimensions.width);
    characterLocation.map((item) => {
      const arr = [];
      for (let i = 0; i < item.coordPercentage.length; i++) {
        i % 2 === 0 ?
        arr.push(Math.round(item.coordPercentage[i] * imgDimensions.width))
        :
        arr.push(Math.round(item.coordPercentage[i] * imgDimensions.height));
      }
      const newCharacterLocation = [...characterLocation];
      const index = characterLocation.findIndex(a => item.name === a.name);
      newCharacterLocation[index].coords = arr.join();
      console.log(newCharacterLocation);
      return setCharacterLocation(newCharacterLocation);
    });
  }

  // fetch character locations
  React.useEffect(() => {
      getCharLocations();
  }, []);

  React.useEffect(() => {
    setCoords();
    // console.log(characterLocation);
  }, [mainImg, imgDimensions]);
  // toggle dropdown menu after game starts
  const handleImgClick = (e) => {
    if (isGameStart && correctSelections !== 4) {
      const rect = e.target.getBoundingClientRect();
      // mouse position
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      setMenuPosition({top: y, left: x});
      setShowMenu(showMenu ? false : true);

    } else {
      setShowMenu(false);
    }
  }
  const storeLocation = (e) => {
    setCurrentLocation(e.target.coords);
  }
  const validateSelection = (e) => {
    const selectedCharacter = characterLocation.filter(item => item.name === e.target.textContent.toLowerCase());

    if (selectedCharacter[0].coords === currentLocation) {
      setIsCorrect(true);
      toggleGameMsg();
      setCorrectSelections(prev => prev + 1);

    } else {
      setIsCorrect(false);
      toggleGameMsg();
    }
  }

 
  async function getCharLocations() {
    const db = getFirestore();
    const getLocations = [];
    try{
      const charLocations = await getDocs(collection(db, 'locations'));
      charLocations.docs.forEach((doc) => {
        getLocations.push(doc.data());
      });
      setCharacterLocation(getLocations);
    } catch(err) {
      console.error('failed to retrieve locations collection', err);
    }
  }

  const toggleGameMsg = () => {
    setShowMsg(true);

    setTimeout(() => setShowMsg(false), 2000);
  }

  const toggleIsGameStart = () => {
    setIsGameStart(true);
  }

  const resetGame = () => {
    setIsGameStart(false);
    setCorrectSelections(0);
    console.log(isGameStart);
  }

  return (
    <StyledMain>
      <StyledHeader>
        <StyledLink onClick={resetGame} to='/' >
          <StyledH1>Where's Waldo?</StyledH1>
        </StyledLink>
      </StyledHeader>
      <Routes>
        <Route path='/' element={<Home image={mainImg} />} />
        <Route path='play' element={<GameLevel 
          image={mainImg} 
          imageClick={handleImgClick} 
          show={showMenu} 
          position={menuPosition} 
          storeLocation={storeLocation}
          validate={validateSelection}  
          correctSelections={correctSelections}
          characterLocation={characterLocation}
          showMsg={showMsg}
          isCorrect={isCorrect}
          getImgSize={getImgSize}
          toggleIsGameStart={toggleIsGameStart}
          isGameStart={isGameStart}
          />} />
      </Routes>
      <footer>
        <p>Created by Dylan King</p>
      </footer>
    </StyledMain>
  );
}

export default App;
