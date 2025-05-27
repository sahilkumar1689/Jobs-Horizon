function StatCard({ icon, value, percentage, isPositive, title }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <img src={icon} alt={title} />
      </div>
      <div className="statContent">
        <div className="stat-value">{value}</div>
        <div
          className={`stat-percentage ${isPositive ? "positive" : "negative"}`}
        >
          <span className="percentage-arrow">{isPositive ? "↑" : "↓"}</span>
          {percentage}%
        </div>
        <div className="stat-title">{title}</div>
      </div>
    </div>
  );
}

export default StatCard;
