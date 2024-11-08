import { useMediaQuery } from "react-responsive";
import HamburgerNav from "./HamburgerNav";
import { useState } from "react";
import Navbar from "./Navbar";
import SideDrawer from "./SideDrawer";
import { Route, Routes } from "react-router-dom";
import Home from "../../screens/Home";
import Services from "../../screens/Services";
import Packages from "../../screens/Packages";
import Gamelist from "../../screens/Gamelist";
import Contact from "../../screens/Contact";
import About from "../../screens/About";
import EInvites from "../../screens/EInvites";
import BDayCard from "../../screens/BDayCard";
import Book from "../../screens/Book";
import "../../assets/css/routing.css";

export default function Routing() {
    const hamburgerdetector = useMediaQuery({ query: "(max-width: 991px)" });
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    return (
        <div id="routing-div" className="px-[5vw]">
            {hamburgerdetector ? <HamburgerNav drawerfunc={setDrawerOpen} /> : <Navbar />}
            <SideDrawer drawerstate={drawerOpen} drawerfunc={setDrawerOpen} />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/gamelist" element={<Gamelist />} />
                <Route path="/contactus" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/e-invites" element={<EInvites />} />
                <Route path="/bdaycard" element={<BDayCard />} />
                <Route path="/book" element={<Book />} />
            </Routes>
        </div>
    );
}
