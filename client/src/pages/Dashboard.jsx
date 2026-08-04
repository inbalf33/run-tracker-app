import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import Footer from '../components/Footer';
import RunFormModal from '../components/RunFormModal';
import { getRuns, addRun } from '../api/runsApi';
import { toast } from 'react-toastify';

function Dashboard() {
  const [runs, setRuns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // טעינת הריצות מהשרת
  const fetchRuns = async () => {
    try {
      const data = await getRuns();
      setRuns(data || []);
    } catch (err) {
      toast.error('שגיאה בטעינת הריצות');
      setRuns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRuns();
  }, []);

  // שמירת ריצה חדשה
  const handleSaveRun = async (newRunData) => {
    try {
      await addRun(newRunData);
      toast.success('הריצה נשמרה בהצלחה!');
      fetchRuns(); // רענון הרשימה והנתונים
    } catch (err) {
      toast.error(err.response?.data?.message || 'שגיאה בשמירת הריצה');
    }
  };

  // חישובי הסטטיסטיקות
  const totalDistance = runs.reduce((acc, curr) => acc + Number(curr.distance || 0), 0);
  const totalDurationMinutes = runs.reduce((acc, curr) => acc + Number(curr.duration || 0), 0);
  
  // חישוב קצב ממוצע (דקות לק"מ)
  const avgPaceMinutes = totalDistance > 0 ? totalDurationMinutes / totalDistance : 0;

  // פונקציית עזר להמרת דקות לפורמט HH:MM:SS
  const formatDuration = (totalMinutes) => {
    if (!totalMinutes || totalMinutes === 0) return '00:00:00';
    const totalSeconds = Math.round(totalMinutes * 60);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  // פונקציית עזר לפורמט קצב (MM:SS /ק"מ)
  const formatPace = (paceMinutes) => {
    if (!paceMinutes || paceMinutes === 0) return '0:00 /ק"מ';
    const mins = Math.floor(paceMinutes);
    const secs = Math.round((paceMinutes - mins) * 60);
    const pad = (num) => String(num).padStart(2, '0');
    return `${mins}:${pad(secs)} /ק"מ`;
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column justify-content-between p-0 m-0" dir="rtl">
      
      <Navbar />

      <main className="container-fluid my-4 flex-grow-1 d-flex flex-column">
        <div className="row g-4 flex-grow-1">

          {/* Sidebar Right: רשימת הריצות */}
          <aside className="col-12 col-lg-4">
            <div className="bg-white rounded-4 shadow-sm border p-3 h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                  <h5 className="fw-bold m-0">
                    <i className="fa-solid fa-list-ol me-2 text-primary"></i>
                    הריצות שלי ({runs.length})
                  </h5>
                  <button 
                    onClick={() => setShowModal(true)} 
                    className="btn btn-primary btn-sm rounded-circle shadow-sm"
                    title="הוסף ריצה"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>

                {/* תצוגה כאשר אין ריצות */}
                {!loading && runs.length === 0 && (
                  <div className="text-center text-muted py-5">
                    <i className="fa-solid fa-person-running fs-1 mb-2 text-secondary opacity-50"></i>
                    <p className="small m-0 fw-bold">עדיין אין ריצות רשומות</p>
                    <p className="small">לחץ על '+' כדי להוסיף את הריצה הראשונה!</p>
                  </div>
                )}

                {/* רשימת הריצות כשיש נתונים */}
                <div className="d-flex flex-column gap-2 overflow-auto" style={{ maxHeight: '60vh' }}>
                  {runs.map((run, index) => {
                    const runPace = run.distance > 0 ? run.duration / run.distance : 0;
                    return (
                      <div key={run._id || index} className="p-3 border rounded-3 bg-light shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="fw-bold text-dark">{run.date?.split('T')[0]}</span>
                          <span className="badge bg-primary rounded-pill">{run.distance} ק"מ</span>
                        </div>
                        <div className="d-flex justify-content-between text-muted small">
                          <span><i className="fa-regular fa-clock me-1"></i>{formatDuration(run.duration)}</span>
                          <span><i className="fa-solid fa-gauge-high me-1"></i>{formatPace(runPace)}</span>
                        </div>
                        {run.notes && (
                          <div className="mt-2 pt-2 border-top text-secondary small fst-italic">
                            "{run.notes}"
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </aside>

          {/* Main Area Left: נתונים כלליים וגרפים */}
          <section className="col-12 col-lg-8 d-flex flex-column">
            <div className="bg-white rounded-4 shadow-sm border p-4 flex-grow-1">
              <h4 className="fw-bold mb-4 border-bottom pb-2">
                <i className="fa-solid fa-chart-line me-2 text-success"></i>
                סיכום נתונים
              </h4>

              {/* Cards Summary Row */}
              <div className="row g-3 mb-4">
                <StatCard 
                  title="מרחק מצטבר" 
                  value={`${totalDistance.toFixed(1)} ק"מ`} 
                  icon="fa-solid fa-route"
                  colorClass="text-primary" 
                />
                <StatCard 
                  title="זמן ריצה כולל" 
                  value={formatDuration(totalDurationMinutes)} 
                  icon="fa-solid fa-stopwatch"
                  colorClass="text-success" 
                />
                <StatCard 
                  title="קצב ממוצע" 
                  value={formatPace(avgPaceMinutes)} 
                  icon="fa-solid fa-bolt"
                  colorClass="text-warning" 
                />
              </div>

              {/* אזור תרשים / הודעה */}
              <div className="border rounded-4 p-5 text-center bg-light text-muted flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                <i className="fa-solid fa-chart-pie fs-1 mb-2 text-secondary opacity-50"></i>
                {runs.length === 0 ? (
                  <p className="m-0">הנתונים והגרפים יתעדכנו כאן ברגע שתתחיל לתעד ריצות.</p>
                ) : (
                  <p className="m-0">כאן נוכל לשלב גרפים מתקדמים בהמשך!</p>
                )}
              </div>

            </div>
          </section>

        </div>
      </main>

      <Footer />

      {/* Modal הוספת ריצה */}
      <RunFormModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        onSave={handleSaveRun} 
      />

    </div>
  );
}

export default Dashboard;