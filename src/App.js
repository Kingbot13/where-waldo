import getFirebaseConfig from './firebase-config';
import {initializeApp} from 'firebase/app';
import './App.css';
import Home from './components/Home';

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

function App() {
  return (
    <main>
      <header>
        <h1>Where's Waldo</h1>
      </header>
      <Home />
      <footer>
        <p>Created by Dylan King</p>
      </footer>
    </main>
  );
}

export default App;
