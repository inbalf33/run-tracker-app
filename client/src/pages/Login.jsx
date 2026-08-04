import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../api/authApi';
import { toast } from 'react-toastify';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('כתובת אימייל לא תקינה')
        .required('שדה חובה'),
      password: Yup.string()
        .min(6, 'סיסמה חייבת להכיל לפחות 6 תווים')
        .required('שדה חובה'),
    }),
    onSubmit: async (values) => {
      try {
        const data = await loginUser(values);
        const token = data.token || data;
        login(token);

        toast.success('התחברת בהצלחה!');
        navigate('/dashboard');
      } catch (err) {
        toast.error(err.response?.data?.message || err.response?.data || 'שגיאה בהתחברות');
      }
    },
  });

  return (
    <div className="container mt-5" style={{ maxWidth: '420px' }}>
      <div className="card shadow border-0 p-4 rounded-4" dir="rtl">
        
        {/* Header section with top icon */}
        <div className="text-center mb-4">
          <div 
            className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style={{ width: '60px', height: '60px', fontSize: '1.8rem' }}
          >
            <i className="fa-solid fa-person-running"></i>
          </div>
          <h3 className="fw-bold m-0">Run Tracker</h3>
          <p className="text-muted small mt-1">התחברות לחשבון שלך</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          
          {/* Email Floating Input */}
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              id="floatingEmail"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? 'is-invalid' : ''
              }`}
              placeholder="name@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <label htmlFor="floatingEmail">דוא"ל</label>
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Floating Input */}
          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              id="floatingPassword"
              className={`form-control ${
                formik.touched.password && formik.errors.password ? 'is-invalid' : ''
              }`}
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <label htmlFor="floatingPassword">סיסמה</label>
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold mt-2 rounded-3">
            התחבר
          </button>
        </form>

        {/* Link to Register */}
        <div className="text-center mt-4 pt-2 border-top">
          <span className="text-muted small">עדיין אין לך חשבון? </span>
          <Link to="/register" className="text-decoration-none fw-bold small">
            להרשמה לחץ כאן
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;