import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  
  let userName = 'אורח';
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name || decoded.username || decoded.email || 'משתמש';
    } catch (err) {
      console.error('Error decoding token:', err);
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar bg-body-tertiary border-bottom shadow-sm px-4" dir="rtl">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        
        <div className="d-flex align-items-center gap-2">
          <i className="fa-solid fa-person-running fs-3 text-primary"></i>
          <span className="navbar-brand mb-0 h1 fw-bold fs-4">Run Tracker</span>
        </div>

        
        <div className="d-flex align-items-center gap-3">
          <span className="fw-semibold text-secondary">
            <i className="fa-solid fa-user me-2 text-primary"></i>
            שלום, <span className="text-dark">{userName}</span>
          </span>

          <button 
            onClick={handleLogout} 
            className="btn btn-outline-danger btn-sm fw-semibold d-flex align-items-center gap-1"
          >
            <i className="fa-solid fa-right-from-bracket"></i> התנתק
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;