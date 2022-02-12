const config = {
    apiKey: "AIzaSyB7HLM5BHLHhScSBbDpYUVDk0y5R_3gA4o",
    authDomain: "where-swaldo.firebaseapp.com",
    projectId: "where-swaldo",
    storageBucket: "where-swaldo.appspot.com",
    messagingSenderId: "664165355693",
    appId: "1:664165355693:web:026e9affd7fd3c7edef624"
  };

  export default function getFirebaseConfig() {
      if (!config || !config.apiKey) {
          throw new Error('no firebase config object provided');
      } else {
          return config;
      }
  }