import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Estoque from '../estoque_route/Estoque';
import Login from '../login_route/Login';
import './App.css';

function App() {
  return (
    <div>
    
   <Router>

    <Routes>
    <Route path="/" element={ <Navigate to='/sgeprodutos/login' replace/>}/>
    <Route path="/sgeprodutos/login" element={<Login/>}/>
    <Route path="/sgeprodutos/estoque" element={<Estoque/>}/>
    </Routes>

   </Router>
   </div>
  );
}

export default App;
