import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Appointments from './components/appointments/index';

function App() {
    return (
        <div>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/appointments/:id' element={<Appointments/>} />
              </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
