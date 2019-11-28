import React, { Fragment } from "react";
import classNames from "classnames";
import "./style.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";

export default function Appointment(props) {
  console.log(props);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          studentName={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}
