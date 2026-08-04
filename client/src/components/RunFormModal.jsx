import { useFormik } from 'formik';
import * as Yup from 'yup';

function RunFormModal({ show, handleClose, onSave }) {
  const formik = useFormik({
    initialValues: {
      date: new Date().toISOString().split('T')[0],
      distance: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      notes: '',
    },
    validationSchema: Yup.object({
      date: Yup.date().required('שדה חובה'),
      distance: Yup.number()
        .positive('המרחק חייב להיות מספר חיובי')
        .required('שדה חובה'),
      hours: Yup.number().min(0, 'לא תקין'),
      minutes: Yup.number().min(0, 'לא תקין').max(59, 'עד 59 דקות'),
      seconds: Yup.number().min(0, 'לא תקין').max(59, 'עד 59 שניות'),
      notes: Yup.string().max(200, 'הערה ארוכה מדי (עד 200 תווים)'),
feat: complete React client structure, API integration, and Dashboard UI

      onSave(payload);
      resetForm();
      handleClose();
    },
  });

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 border-0 shadow">
          
          {/* Header */}
          <div className="modal-header border-bottom flex-row-reverse">
            <h5 className="modal-title fw-bold m-0 text-end w-100">
              <i className="fa-solid fa-person-running me-2 text-primary"></i>
              הוספת ריצה חדשה
            </h5>
            <button type="button" className="btn-close m-0" onClick={handleClose}></button>
          </div>

          {/* Form Body */}
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-body p-4 text-end">
              
              {/* תאריך */}
              <div className="mb-3">
                <label className="form-label small fw-bold">תאריך הריצה</label>
                <input
                  type="date"
                  name="date"
                  className={`form-control text-end ${
                    formik.touched.date && formik.errors.date ? 'is-invalid' : ''
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="invalid-feedback">{formik.errors.date}</div>
                )}
              </div>

              {/* מרחק */}
              <div className="mb-3">
                <label className="form-label small fw-bold">מרחק (ק"מ)</label>
                <input
                  type="number"
                  step="0.01"
                  name="distance"
                  placeholder="למשל: 10.5"
                  className={`form-control text-end ${
                    formik.touched.distance && formik.errors.distance ? 'is-invalid' : ''
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.distance}
                />
                {formik.touched.distance && formik.errors.distance && (
                  <div className="invalid-feedback">{formik.errors.distance}</div>
                )}
              </div>

              {/* משך זמן - שעות : דקות : שניות */}
              <div className="mb-3">
                <label className="form-label small fw-bold">משך זמן (שעות : דקות : שניות)</label>
                <div className="row g-2 flex-row-reverse">
                  
                  {/* שעות - יופיע בימין */}
                  <div className="col-4 text-center">
                    <input
                      type="number"
                      name="hours"
                      min="0"
                      placeholder="0"
                      className="form-control text-center"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.hours}
                    />
                    <small className="text-muted mt-1 d-block">שעות</small>
                  </div>

                  {/* דקות - יופיע באמצע */}
                  <div className="col-4 text-center">
                    <input
                      type="number"
                      name="minutes"
                      min="0"
                      max="59"
                      placeholder="0"
                      className={`form-control text-center ${
                        formik.touched.minutes && formik.errors.minutes ? 'is-invalid' : ''
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.minutes}
                    />
                    <small className="text-muted mt-1 d-block">דקות</small>
                  </div>

                  {/* שניות - יופיע בשמאל */}
                  <div className="col-4 text-center">
                    <input
                      type="number"
                      name="seconds"
                      min="0"
                      max="59"
                      placeholder="0"
                      className={`form-control text-center ${
                        formik.touched.seconds && formik.errors.seconds ? 'is-invalid' : ''
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.seconds}
                    />
                    <small className="text-muted mt-1 d-block">שניות</small>
                  </div>

                </div>
              </div>

              {/* הערות */}
              <div className="mb-3">
                <label className="form-label small fw-bold">הערות (אופציונלי)</label>
                <textarea
                  name="notes"
                  rows="2"
                  placeholder="איך הייתה הריצה? מזג אויר, מסלול..."
                  className={`form-control text-end ${
                    formik.touched.notes && formik.errors.notes ? 'is-invalid' : ''
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.notes}
                />
                {formik.touched.notes && formik.errors.notes && (
                  <div className="invalid-feedback">{formik.errors.notes}</div>
                )}
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="modal-footer border-top d-flex flex-row-reverse gap-2">
              <button type="submit" className="btn btn-primary rounded-3 px-4 fw-bold">
                שמור ריצה
              </button>
              <button type="button" className="btn btn-secondary rounded-3 px-4" onClick={handleClose}>
                ביטול
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default RunFormModal;