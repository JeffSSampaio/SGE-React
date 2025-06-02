import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Estoque from './Estoque';
import Login from './Login';
import './App.css';

function App() {
  return (
   <Router>
     <nav>
      <Link to="/">login</Link>
      <Link to="/estoque">estoque</Link>
     </nav>

    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/estoque" element={<Estoque/>}/>
    </Routes>

   </Router>
  );
}

export default App;
