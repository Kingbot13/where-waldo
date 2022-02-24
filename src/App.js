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

  // fetch main image
  React.useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, 'wheres-waldo-main.jpg'))
    .then(url => setMainImg([url]))
    .catch(error => console.error('image not retrieved from database', error));
  }, []);
  // fetch character locations
  React.useEffect(() => {
    if (characterLocation.length < 1) {

      async function getCharLocations() {
        try{
          const charLocations = await getDocs(collection(getFirestore(), 'locations'));
          charLocations.forEach((doc) => {
            setCharacterLocation([...characterLocation, {id: doc.id, data: doc.data()}]);
          });
    
        } catch(err) {
          console.error('failed to retrieve locations collection', err);
        }
      }
      getCharLocations();
      console.log(characterLocation);
    }

  },[characterLocation]);
  // toggle dropdown menu
  const handleImgClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    // mouse position
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setMenuPosition({top: y, left: x});
    setShowMenu(showMenu ? false : true);
  }
  const storeLocation = (e) => {
    setCurrentLocation(e.target.coords);
  }

  const validateSelection = (e) => {
    return;
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
          />} />
      </Routes>
      <footer>
        <p>Created by Dylan King</p>
      </footer>
    </StyledMain>
  );
}

export default App;
