import './App.css';
import Form from './components/Form';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0hA2Bc74PEzeuoahNApERIEkxFqv_jSo",
  authDomain: "techteamexpansion23.firebaseapp.com",
  projectId: "techteamexpansion23",
  storageBucket: "techteamexpansion23.appspot.com",
  messagingSenderId: "542718392377",
  appId: "1:542718392377:web:bf6178e1b28494fe8c35e8",
  measurementId: "G-39B1R2EWV2"
};

// Initialize Firebase with the provided configuration
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      {/* Render the Form component */}
      <Form></Form>
    </div>
  );
}

export default App;
