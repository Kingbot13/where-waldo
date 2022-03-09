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

  // fetch main image
  React.useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, 'wheres-waldo-main.jpg'))
    .then(url => setMainImg([url]))
    .catch(error => console.error('image not retrieved from database', error));
  }, []);
  // dynamically set coordinates to use with area elements
  const setCoords = () => {
    const image = document.querySelector('img');
    const imageHeight = image.height;
    const imageWidth = image.width;
    console.log("img height", imageHeight, "img width", imageWidth);
    characterLocation.map((item) => {
      const arr = [];
      for (let i = 0; i < item.coordPercentage.length; i++) {
        i % 2 === 0 ?
        arr.push(Math.round(item.coordPercentage[i] * imageWidth))
        :
        arr.push(Math.round(item.coordPercentage[i] * imageHeight));
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
      

    // console.log(characterLocation);

  }, []);

  React.useEffect(() => {
    setCoords();
    console.log(characterLocation);
  }, [mainImg]);
  // toggle dropdown menu after game starts
  const handleImgClick = (e) => {
    if (isGameStart) {
      const rect = e.target.getBoundingClientRect();
      // mouse position
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      setMenuPosition({top: y, left: x});
      setShowMenu(showMenu ? false : true);

    } else {
      setIsGameStart(true);
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
      console.log(correctSelections);
      console.log('correct');
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
    setShowMsg(!showMsg ? true : false);

    setTimeout(() => setShowMsg(!showMsg ? true : false), 1000);
  }

  return (
    <StyledMain>
      <header>
        <Link to='/' >
          <h1>Where's Waldo</h1>
        </Link>
      </header>
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
          />} />
      </Routes>
      <footer>
        <p>Created by Dylan King</p>
      </footer>
    </StyledMain>
  );
}

export default App;
