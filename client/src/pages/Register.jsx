import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'שם חייב להכיל לפחות 2 תווים')
        .required('שדה חובה'),
      email: Yup.string()
        .email('כתובת אימייל לא תקינה')
        .required('שדה חובה'),
      password: Yup.string()
        .min(6, 'סיסמה חייבת להכיל לפחות 6 תווים')
        .required('שדה חובה'),
    }),
    onSubmit: async (values) => {
      try {
        await registerUser(values);
        toast.success('ההרשמה בוצעה בהצלחה! כעת תוכל להתחבר');
        navigate('/login');
      } catch (err) {
        toast.error(err.response?.data?.message || err.response?.data || 'שגיאה בהרשמה');
      }
    },
  });

  return (
    <div className="container mt-5" style={{ maxWidth: '420px' }}>
      <div className="card shadow border-0 p-4 rounded-4" dir="rtl">
        
        {/* Header section */}
        <div className="text-center mb-4">
          <div 
            className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style={{ width: '60px', height: '60px', fontSize: '1.8rem' }}
          >
            <i className="fa-solid fa-user-plus"></i>
          </div>
          <h3 className="fw-bold m-0">יצירת חשבון</h3>
          <p className="text-muted small mt-1">הצטרף ל-Run Tracker</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          
          {/* Name Floating Input */}
          <div className="form-floating mb-3">
            <input
              type="text"
              name="name"
              id="floatingName"
              className={`form-control ${
                formik.touched.name && formik.errors.name ? 'is-invalid' : ''
              }`}
              placeholder="ישראל ישראלי"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <label htmlFor="floatingName">שם מלא</label>
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>

          {/* Email Floating Input */}
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              id="floatingRegisterEmail"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? 'is-invalid' : ''
              }`}
              placeholder="name@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <label htmlFor="floatingRegisterEmail">דוא"ל</label>
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Floating Input */}
          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              id="floatingRegisterPassword"
              className={`form-control ${
                formik.touched.password && formik.errors.password ? 'is-invalid' : ''
              }`}
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <label htmlFor="floatingRegisterPassword">סיסמה</label>
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100 py-2 fw-bold mt-2 rounded-3">
            הרשם עכשיו
          </button>
        </form>

        {/* Link to Login */}
        <div className="text-center mt-4 pt-2 border-top">
          <span className="text-muted small">כבר יש לך חשבון? </span>
          <Link to="/login" className="text-decoration-none fw-bold small text-success">
            להתחברות לחץ כאן
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;