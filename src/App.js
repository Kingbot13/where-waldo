import getFirebaseConfig from './firebase-config';
import {initializeApp} from 'firebase/app';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import './App.css';
import Home from './components/Home';
import React from 'react';

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

function App() {
  const [mainImg, setMainImg] = React.useState([]);
  
  React.useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, 'wheres-waldo-main.jpg'))
    .then(url => setMainImg([url]))
    .catch(error => console.error('image not retrieved from database', error));
  }, []);
  return (
    <main>
      <header>
        <h1>Where's Waldo</h1>
      </header>
      <Home image={mainImg} />
      <footer>
        <p>Created by Dylan King</p>
      </footer>
    </main>
  );
}

export default App;
