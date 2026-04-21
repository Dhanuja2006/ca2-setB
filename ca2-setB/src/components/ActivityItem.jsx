import React from "react";
import { useActivity } from "../context/ActivityContext.jsx";

const ActivityItem = ({ activity }) => {
  const { toggleGoal } = useActivity();
  const displayName = activity.name ? activity.name : "unknown";
  const displayDate = activity.date ? activity.date : "no date";

  const goalVal = activity.goalAchieved !== undefined ? activity.goalAchieved : activity.goalAcheived;

  return (
    <div className="activity-item">
      <h3>{displayName}</h3>
      <p>ID: {activity.activityID || activity.activityId}</p>
      <p>Date: {displayDate}</p>
      <p>Steps: {activity.steps}</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Goal Achieved: {String(goalVal)}</p>
      <button onClick={() => toggleGoal(activity.activityID || activity.activityId)}>
        Toggle Goal
      </button>
    </div>
  );
};

export default ActivityItem;
