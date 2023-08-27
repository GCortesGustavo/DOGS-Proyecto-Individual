import './App.css';
import Landing from "./components/landing/landing";
// import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import DogCreate from './components/DogCreate/DogCreate';
import HomePage from './components/Home/HomePage';
import Detail from './components/Detail/detail';

function App() {


  return (
    <div className="App">
    
      <Routes>
          <Route path="/" element={<Landing/>}/>

          <Route path="/home" element={<HomePage/>}/>

          <Route path='/dogcreate' element={<DogCreate/>}/>

          <Route path="/detail/:id" element={<Detail />} />

      </Routes>
    </div>
    
  );
}

export default App;
