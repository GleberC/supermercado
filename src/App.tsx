// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import './App.css'; // agora está importando corretamente

function App() {
  return (
    <Router>
      <header className="header">
        <Link to="/">Cliente</Link>
        <Link to="/admin">Administrador</Link>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
