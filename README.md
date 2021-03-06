# Interview Scheduler

"Interview Scheduler" is an application, which allows a student to create, edit and delete interview appointments. A student can select from the list of interviewers and choose a time from the available time slots.

## Opening page

Landing page, with up to five appointments per day and dynamic counter for the remaining spots.

!["screenshot of homepage"](https://github.com/nirali420/scheduler/blob/master/docs/the-app.png)

## Responsive design

The design is responsive for different screen sizes

!["screenshot of responsive design"](https://github.com/nirali420/scheduler/blob/master/docs/Responsive.png)

## Create new Appointment

Allows student to create appointment, by entering the name and selecting the interviewer.

!["screenshot of creating appointment"](https://github.com/nirali420/scheduler/blob/master/docs/Schedule-interview.png)

## Warnings

Warns user if name field was left empty.

!["screenshot of warning message"](https://github.com/nirali420/scheduler/blob/master/docs/check-message.png)

## Warning message on delete.

Displays confirmation message before deleting.

!["screenshot of delete message"](https://github.com/nirali420/scheduler/blob/master/docs/Delete-message.png)

## Transition spinner

Spinner animation while saving or deleting message.

!["screenshot of delete spinner"](https://github.com/nirali420/scheduler/blob/master/docs/Delete-transition.png)

## Functional Requirements

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project.

## Behavioural Requirements

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Dependencies

- React
- React-dom
- Normalize
- Webpack, Babel
- Axios
- Storybook
- Jest

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
