import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  Toolbar,
  ViewSwitcher,
  TodayButton,
  DateNavigator,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  fetchEvents,
  postEvents,
  updateEvents,
  deleteEvents,
} from '../../redux/slices/calendarSlice';
import { convertDateObjectToUnix, convertUnixToDateObject } from '../../utils/dateformatter';
import {
  ToolbarWithLoading,
  BooleanEditor,
  messages,
  TextEditor,
  ToolTipHeader,
  Appointment,
} from '../ui/CalendarUi';
// Custom Alert Toast
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Calendar() {
  const calendarEvents = useSelector((state) => state.calendar.calendarEvents);
  const status = useSelector((state) => state.calendar.status);
  const [formattedCalendarEvents, setFormattedCalendarEvents] = useState();
  const [currentDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Dispatches the relevant actions depending on commit type
  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      // Converts the javascript date objects to unix timestamps before sending them to redux & then database
      const newAdded = { ...added };
      newAdded.startDate = convertUnixToDateObject(added.startDate);
      newAdded.endDate = convertUnixToDateObject(added.endDate);
      dispatch(postEvents({ added: newAdded }));
    }
    if (changed) {
      const [changedId, changedValue] = Object.entries(changed)[0];
      const newChange = { ...changed };
      if (changedValue.startDate) {
        newChange[changedId].startDate = convertUnixToDateObject(changedValue.startDate);
      }
      if (changedValue.endDate) {
        newChange[changedId].endDate = convertUnixToDateObject(changedValue.endDate);
      }
      dispatch(updateEvents({ changed: newChange }));
    }
    if (deleted !== undefined) {
      dispatch(deleteEvents({ id: deleted }));
    }
  };
  // Handles close button on Alert Toast
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    // Once Calender Events from redux store changes we need to format the unix timestamp to date objects
    const formattedEvent = calendarEvents.map((appointment) => {
      const newAppointment = { ...appointment };
      newAppointment.startDate = convertDateObjectToUnix(appointment.startDate);
      newAppointment.endDate = convertDateObjectToUnix(appointment.endDate);
      return newAppointment;
    });
    setFormattedCalendarEvents([...formattedEvent]);
  }, [calendarEvents]);
  useEffect(() => {
    // Gets the initial CalendarEvents on page load
    dispatch(fetchEvents());
  }, []);
  useEffect(() => {
    //Checks if one of the api calls has error and opens the error Toast
    status === 'error' || status === 'failed' ? setOpen(true) : setOpen(false);
  }, [status]);

  return (
    <>
      <Paper>
        <Scheduler data={formattedCalendarEvents} height={500}>
          <ViewState defaultCurrentDate={currentDate} defaultCurrentViewName="Week" />
          <EditingState onCommitChanges={commitChanges} />
          <IntegratedEditing />
          <DayView />
          <WeekView />
          <MonthView />
          <Toolbar {...(status === 'loading' ? { rootComponent: ToolbarWithLoading } : null)} />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <ConfirmationDialog />
          <Appointments appointmentComponent={Appointment} />
          <AppointmentTooltip headerComponent={ToolTipHeader} />
          <AppointmentForm
            booleanEditorComponent={BooleanEditor}
            textEditorComponent={TextEditor}
            messages={messages}
          />
          <AllDayPanel />
        </Scheduler>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          An error occurred while connecting to the server. Please reload the page.
        </Alert>
      </Snackbar>
    </>
  );
}
