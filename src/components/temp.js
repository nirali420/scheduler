/*
useEffect(() => {
    // const source = axios.CancelToken.source();
    const days = axios.get(`/api/days`, {
      proxy: { host: 'localhost', port: 3001 },
      // cancelToken: source.token,
    });
    const appointments = axios.get(`/api/appointments`, {
      proxy: { host: 'localhost', port: 3001 },
      // cancelToken: source.token,
    });
    const interviewers = axios.get(`/api/interviewers`, {
      proxy: { host: 'localhost', port: 3001 },
      // cancelToken: source.token,
    });
    Promise.all([days, appointments, interviewers]).then(
      ([days, appointments, interviewers]) =>
        dispatch({
          type: SET_APPLICATION_DATA,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        })
    )}, []);
*/

// return the appointments
const appointmentsId = state.days
  .filter(e => e.name === day)
  .map(e => e.appointments)
  .reduce((acc, val) => acc.concat(val), []);

const appointment = [];
appointmentsId.forEach(e => {
  appointment.push(state.appointments[e]);
});

return appointment;

// Returns the interviewrs for a given day (ex: Monday)
export const getInterviewersForDay = (state, day) => {
  const interviewersId = state.days
    .filter(e => e.name === day)
    .map(e => e.interviewers)
    .reduce((acc, val) => acc.concat(val), []);

  const interviewers = [];

  interviewersId.forEach(e => {
    interviewers.push(state.interviewers[e]);
  });

  return interviewers;
};

// Returns an object like: {student, interviewer}
export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    const interviewObj = { student, interviewer };
    return interviewObj;
  }
};

// Returns the number of spots taken
export const getSpotsForDay = (appointments, days, day) => {
  const targetDay = days.find(e => e.name === day);
  const appointmentList = [...targetDay.appointments];
  const availableSpots = appointmentList.length;

  const appointmentsSpread = { ...appointments };

  const filledSpots = Object.values(appointmentsSpread).reduce(
    (total, appointment) => {
      if (appointmentList.includes(appointment.id)) {
        if (appointment.interview) {
          return total + 1;
        }
      }
      return total;
    },
    0
  );

  return availableSpots - filledSpots;
};
