import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Employe from './Employe/Employe';
// import EmployeForm from './Employe/EmployeForm';
import CreateEmploye from './Employe/CreateEmploye'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Employe />}/>
          <Route path="/create" element={<CreateEmploye />}></Route>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
