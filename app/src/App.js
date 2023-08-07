
import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Appointments from './components/appointments/index';
import Doctors from './components/appointments/doctors';

function App() {
  return (
    <div >
      <div>
       
        <a href="doctors" target="_blanc">Doctors</a>
      </div>
      <BrowserRouter>
      <Routes>
        <Route path='/doctors' element={<Doctors/>} />  
        <Route path='/appointments/:id' element={<Appointments/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
