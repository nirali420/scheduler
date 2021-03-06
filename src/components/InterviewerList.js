import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
  };
  const interviewers = props.interviewers.map(interviewer => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
