
import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Appointments from './components/appointments/index';
import Doctors from './components/main/Doctors';

function App() {
  return (
    
    <div >
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
