import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Employe from './Employe/Employe';
import EmployeForm from './Employe/EmployeForm';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Employe />}/>
          <Route path='/create' element={<EmployeForm />}/>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
