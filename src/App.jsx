import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans"
import VanDetail from "./pages/VanDetail"

import "./server";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link className="site-logo" to="/">
            #VanLife
          </Link>
          <nav>
            <Link to="/about">About</Link>
            <Link to="/vans">Vans</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/vans/:id" element={<VanDetail />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

