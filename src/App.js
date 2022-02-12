import getFirebaseConfig from './firebase-config';
import {initializeApp} from 'firebase/app';
import './App.css';

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

function App() {
  return (
 //stuff
  );
}

export default App;
