import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Appointments from './components/appointments/index';
import Admin from "./components/Admin";
import Doctors from './components/main/Doctors';
import ApplyDoctorForm from './components/applyDoctor/js';

function App() {
    return (
        <div>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
                <Route path='/appointments/:id' element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
                <Route path='/admin' element={<ProtectedRoute><ApplyDoctorForm /></ProtectedRoute>} /> 
              </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
