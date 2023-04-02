import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import MynotesState from './context/MynotesState';
// import dotenv from 'dotenv';

function App() {
  // dotenv.config();
  return (
    <>
      <MynotesState>
        <Navbar />
        <Home />
      </MynotesState>
    </>
  );
}

export default App;
