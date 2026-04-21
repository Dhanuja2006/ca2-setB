import React, { useState } from "react";
import { useActivity } from "../context/ActivityContext.jsx";
import ActivityItem from "../components/ActivityItem.jsx";

const Filter = () => {
  const { activities } = useActivity();
  const [minSteps, setMinSteps] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMinSteps(value);

    if (value.trim() === "") {
      setError("Empty input show error");
    } else if (isNaN(value) || Number(value) < 0) {
      setError("Invalid input show message");
    } else {
      setError("");
    }
  };


  const validActivities = activities.filter((activity) => {
    const goalStatus = activity.goalAchieved !== undefined ? activity.goalAchieved : activity.goalAcheived;

    return (
      Number(activity.steps) > 0 &&
      Number(activity.caloriesBurned) > 0 &&
      Number(activity.workoutMinutes) > 0 &&
      typeof goalStatus === "boolean"
    );
  });

  const filteredActivities = validActivities.filter((activity) => {
    if (error || minSteps.trim() === "") return false;
    return Number(activity.steps) >= Number(minSteps);
  });

  return (
    <div className="filter-page">
      <h1>Filter Activities</h1>

      <div className="filter-controls">
        <label htmlFor="step-filter">Minimum Steps Required:</label>
        <input
          id="step-filter"
          type="text"
          value={minSteps}
          onChange={handleInputChange}
          placeholder="Enter steps (e.g. 5000)"
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="activities-list">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <ActivityItem
              key={activity.activityID || activity.activityId || Math.random()}
              activity={activity}
            />
          ))
        ) : (
          !error && minSteps.trim() !== "" && <p className="no-results">No activities match your criteria.</p>
        )}
        {!error && minSteps.trim() === "" && <p className="prompt-text">Please enter a minimum step count to filter activities.</p>}
      </div>
    </div>
  );
};

export default Filter;


