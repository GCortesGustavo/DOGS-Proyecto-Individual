import './App.css';
import Landing from "./components/landing/landing";
// import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Form from "./components/form";
  

function App() {


  return (
    <div className="App">
    
      <Routes>
          <Route path="/" element={<Landing/>}/>

          <Route path="/home" element={<Home/>}/>

          <Route path='/form' element={<Form/>}/>

      </Routes>
    </div>
    
  );
}

export default App;
