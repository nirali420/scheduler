import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "../Application";
import Appointment from "../Appointment";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
