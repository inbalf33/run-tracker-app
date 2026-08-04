function StatCard({ title, value, icon, colorClass = "text-primary" }) {
  return (
    <div className="col-12 col-md-4">
      <div className="p-3 border rounded-3 bg-white shadow-sm h-100 d-flex align-items-center justify-content-between">
        <div>
          <div className="text-muted small mb-1">{title}</div>
          <div className={`fs-3 fw-bold ${colorClass}`}>{value}</div>
        </div>
        {icon && (
          <div className={`fs-1 ${colorClass} opacity-75`}>
            <i className={icon}></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;