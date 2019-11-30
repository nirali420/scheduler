export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  }

  function deleteInterview() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to Delete?"
          onCancel={() => transition(SHOW)}
          onConfirm={deleteInterview}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment." onClose={() => back()} />
      )}
    </article>
  );
}

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
