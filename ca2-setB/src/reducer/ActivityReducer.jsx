export const initialState = {
  activities: [
    {
      activityID: "1",
      name: "Run",
      steps: 5000,
      caloriesBurned: 350,
      workoutMinutes: 45,
      goalAchieved: true,
      date: "2026-04-20",
    },
    {
      activityID: "2",
      name: "Cycling",
      steps: 0,
      caloriesBurned: 400,
      workoutMinutes: 60,
      goalAchieved: true,
      date: "2026-04-19",
    },
  ],
};

export const activityReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_GOAL":
      return {
        ...state,
        activities: state.activities.map((activity) => {
          const activityId = activity.activityID || activity.activityId;
          if (String(activityId) === String(action.payload)) {
            const currentGoalStatus = activity.goalAchieved !== undefined ? activity.goalAchieved : activity.goalAcheived;
            let newGoalStatus = !currentGoalStatus;

            if (Number(activity.steps) > 8000) {
              newGoalStatus = true;
            }

            if (newGoalStatus === currentGoalStatus) {
              return activity;
            }

            return { ...activity, goalAchieved: newGoalStatus };
          }
          return activity;
        }),
      };
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return state;
  }
};
