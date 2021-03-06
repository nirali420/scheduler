import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";
import { render } from "@testing-library/react";

const formatSpots = function(spots) {
  let setSpot;
  if (spots >= 2) {
    setSpot = spots + " spots remaining";
  } else if (spots === 1) {
    setSpot = spots + " spot remaining";
  } else {
    setSpot = "no spots remaining";
  }
  return setSpot;
};

export default function DayListItem(props) {
  let dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li data-testid="day" className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
