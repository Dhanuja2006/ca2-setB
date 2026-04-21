import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useActivity } from "../context/ActivityContext";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activities } = useActivity();


  const activity = activities.find(a => String(a.activityID || a.activityId) === String(id));

  if (!activity) {
    return (
      <div className="error-container">
        <h1>Activity Not Found</h1>
        <p>The activity with ID "{id}" could not be located.</p>
        <button onClick={() => navigate("/activities")}>Back to Activities</button>
      </div>
    );
  }

  const calories = Number(activity.caloriesBurned) || 0;
  const minutes = Number(activity.workoutMinutes) || 0;
  const efficiency = minutes > 0 ? (calories / minutes).toFixed(2) : "N/A";

  const goalStatus = activity.goalAchieved !== undefined ? activity.goalAchieved : activity.goalAcheived;

  return (
    <div className="activity-detail-page">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>

      <h1>Activity Details</h1>

      <div className="detail-card">
        <div className="detail-item">
          <strong>Activity ID:</strong> <span>{activity.activityID || activity.activityId}</span>
        </div>
        <div className="detail-item">
          <strong>Name:</strong> <span>{activity.name || "Unknown"}</span>
        </div>
        <div className="detail-item">
          <strong>Date:</strong> <span>{activity.date || "No date"}</span>
        </div>
        <div className="detail-item">
          <strong>Steps:</strong> <span>{activity.steps}</span>
        </div>
        <div className="detail-item">
          <strong>Calories Burned:</strong> <span>{activity.caloriesBurned} kcal</span>
        </div>
        <div className="detail-item">
          <strong>Workout Minutes:</strong> <span>{activity.workoutMinutes} mins</span>
        </div>
        <div className="detail-item">
          <strong>Goal Achieved:</strong> <span>{String(goalStatus)}</span>
        </div>

        <div className="efficiency-section">
          <h3>Efficiency Score</h3>
          <p className="efficiency-value">{efficiency}</p>
          <small>(Calories Burned per Minute)</small>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;

