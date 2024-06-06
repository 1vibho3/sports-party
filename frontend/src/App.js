import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import DisplayMatch from './components/DisplayMatch/DisplayMatch';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/getMatch" element={ <DisplayMatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
