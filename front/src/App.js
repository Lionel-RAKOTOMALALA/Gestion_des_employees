import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Employe from './Employe/Employe';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Employe />}></Route>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
