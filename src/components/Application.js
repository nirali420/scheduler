import "components/Application.scss";
import DayList from "./DayList.js";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "../helpers/selectors.js";

const axios = require("axios").default;

// Applicaiton function
export default function Application(props) {
  const [state, setState, cancelInterview] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day =>
    setState({
      ...state,
      appointments
    });
  const getInterviewerForTheDay = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);

  //create & save data
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  }

  useEffect(() => {
    let promiseDays = axios.get(`http://localhost:8001/api/days`);
    let promiseAppt = axios.get(`http://localhost:8001/api/appointments`);
    let promiseInterview = axios.get(`http://localhost:8001/api/interviewers`);
    Promise.all([promiseDays, promiseAppt, promiseInterview]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        getInterviewerForTheDay={getInterviewerForTheDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
