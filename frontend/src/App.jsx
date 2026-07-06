import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './assets/header';
import Navbar from './assets/navbar';
import Footer from './assets/footer';

import Home from './assets/home';
import About from './assets/about';
import Projects from './assets/projects';
import Contact from './assets/contract';

function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <Header />
        <Navbar />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;