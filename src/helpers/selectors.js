// Returns the Appointments by given day
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

// Returns the Appointments by given day
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let returnInterview = {};
  const interviewerId = interview.interviewer;
  const interviewerDetails = state.interviewers[interviewerId];
  returnInterview = {
    student: interview.student,
    interviewer: interviewerDetails
  };
  return returnInterview;
}

// export function getAppointmentsForDay(state, day) {
//   let appointment = [];
//   let filterday = state.days.filter(appointment => appointment.name === day);
//   appointment = filterday[0]["appointments"].map(id => state.appointments[id]);
//   return appointment;
// }
