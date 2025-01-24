import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import BookingBike from './pages/BookingBike';
import UserBookings from './pages/UserBookings';
import 'antd/dist/reset.css';
import { AddBike } from './pages/AddBike';
import AdminHome from './pages/AdminHome';
import  EditBike  from './pages/EditBike';
import Epay from './pages/Epay';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/booking/:bikeid"
            element={
              <ProtectedRoute>
                <BookingBike />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userbookings"
            element={
              <ProtectedRoute>
                <UserBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addbike"
            element={
              <ProtectedRoute>
                <AddBike/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
           <Route
            path="/editbike/:bikeid"
            element={
              <ProtectedRoute>
                <EditBike/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Epay/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('user');
  
  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the child component if authenticated
  return children;
}
