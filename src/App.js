// import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import './App.css';

import Homepage from "./Pages/Homepage/Homepage.jsx";
import EmployeeList from "./Pages/EmployeeList/EmployeeList.jsx";
import Errorpage from "./Pages/Errorpage/Errorpage.jsx";

function App() {
  return (
    <div className="App">
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
