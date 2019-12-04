export function getAppointmentsForDay(state, day) {
  let returnDay = [];
  for (let eachDay of state.days) {
    if (day === eachDay.name) {
      const appointments = eachDay.appointments;
      for (let eachAppointment of appointments) {
        returnDay.push(state.appointments[eachAppointment]);
      }
    }
  }
  return returnDay;
}

export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    let student = interview.student;
    let interviewer = state.interviewers[interview.interviewer];
    let obj = { student, interviewer };
    return obj;
  }
};

export function getInterviewersForDay(state, day) {
  let returnDay = [];
  for (let eachDay of state.days) {
    if (day === eachDay.name) {
      const interviewers = eachDay.interviewers;
      for (let eachAppointment of interviewers) {
        returnDay.push(state.interviewers[eachAppointment]);
      }
    }
  }
  return returnDay;
}
