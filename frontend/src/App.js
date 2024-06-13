import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import DisplayMatch from './components/DisplayMatch/DisplayMatch';
import CreateParty from './components/CreateParty/CreateParty';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/getMatch" element={ <DisplayMatch />} />
          <Route path="/createParty" element={ <CreateParty />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
