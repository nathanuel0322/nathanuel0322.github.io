import React from 'react';
import './assets/css/home.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/global/Navbar';
import Home from './screens/Home';
import Services from './screens/Services';
import Gamelist from './screens/Gamelist';
import Contact from './screens/Contact';
import About from './screens/About';
import Packages from './screens/Packages';
import HamburgerNav from './components/global/HamburgerNav';
import { useMediaQuery } from 'react-responsive';

function App() {
  const hamburgerdetector = useMediaQuery({query: '(max-width: 767px)'});
  return (
    <Router basename={`${process.env.PUBLIC_URL}`}>
      {hamburgerdetector ? <HamburgerNav /> : <Navbar />}
      <Routes>
        <Route exact path='' element={<Home />} />
        <Route exact path='/servicespage' element={<Services />}/>
        <Route exact path='/packagespage' element={<Packages />} />
        <Route exact path='/gamelistpage' element={<Gamelist />} />
        <Route exact path='/contactpage' element={<Contact />} />
        <Route exact path='/aboutpage' element={<About />} />
      </Routes>
    </Router>
  )
}

export default App;
