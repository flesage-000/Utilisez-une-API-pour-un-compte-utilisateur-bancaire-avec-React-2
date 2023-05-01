// import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import './App.css';
import img_wealth_health from './wealth_health.jpg';

import Homepage from "./Pages/Homepage/Homepage.jsx";
import EmployeeList from "./Pages/EmployeeList/EmployeeList.jsx";
import Errorpage from "./Pages/Errorpage/Errorpage.jsx";

function App() {
  return (
    <div className="App">
      <img  alt="Logo Wealth Health"
            src={img_wealth_health} />
      <BrowserRouter>
        <Routes>
          <Route  path="/"
                  element={<Homepage />} />
          <Route  path="/Employee-list"
                  element={<EmployeeList />} />
          <Route  path="*"
                  element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
