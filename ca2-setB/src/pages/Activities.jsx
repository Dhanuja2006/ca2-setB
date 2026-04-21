import React from "react";
import { useActivity } from "../context/ActivityContext";
import ActivityItem from "../components/ActivityItem";

const Activities = () => {
  const { activities } = useActivity();

  const validActivities = activities.filter((activity) => {
    const goalVal = activity.goalAchieved !== undefined ? activity.goalAchieved : activity.goalAcheived;

    return (
      Number(activity.steps) > 0 &&
      Number(activity.caloriesBurned) > 0 &&
      Number(activity.workoutMinutes) > 0 &&
      typeof goalVal === "boolean"
    );
  });

  return (
    <div>
      <h1>Activities List</h1>
      <p>Showing {validActivities.length} valid activities.</p>
      <div className="activities-list">
        {validActivities.map((activity) => (
          <ActivityItem key={activity.activityID || activity.activityId} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Activities;
