import getFirebaseConfig from './firebase-config';
import {initializeApp} from 'firebase/app';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
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
  
  React.useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, 'wheres-waldo-main.jpg'))
    .then(url => setMainImg([url]))
    .catch(error => console.error('image not retrieved from database', error));
  }, []);
  return (
    <StyledMain>
      <header>
        <Link to='/' >
          <h1>Where's Waldo</h1>
        </Link>
      </header>
      <Routes>
        <Route path='/' element={<Home image={mainImg} />} />
        <Route path='play' element={<GameLevel image={mainImg} />} />
      </Routes>
      <footer>
        <p>Created by Dylan King</p>
      </footer>
    </StyledMain>
  );
}

export default App;
