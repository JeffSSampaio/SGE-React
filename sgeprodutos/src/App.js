import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Estoque from './Estoque';
import Login from './Login';
import './App.css';

function App() {
  return (
    <div>
    
   <Router>

    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/estoque" element={<Estoque/>}/>
    </Routes>

   </Router>
   </div>
  );
}

export default App;
