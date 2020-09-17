import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { Appointments, AppointmentForm, AppointmentTooltip, Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import { changeVisibility } from '../../redux/slices/calendarSlice';

export const styles = {
  toolbarRoot: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
};

export const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(({ children, classes, ...restProps }) => (
  <div className={classes.toolbarRoot}>
    <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
    <LinearProgress className={classes.progress} />
  </div>
));

export const BooleanEditor = (props) => {
  return <div></div>;
};
export const messages = {
  moreInformationLabel: '',
};

export const TextEditor = (props) => {
  if (props.type === 'multilineTextEditor') {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

export const ToolTipHeader = ({ showOpenButton, showDeleteButton, ...restProps }) => {
  const toolTipVisibility = useSelector((state) => state.calendar.toolTipVisibility);
  return (
    <AppointmentTooltip.Header
      showOpenButton={toolTipVisibility[restProps.appointmentData.id]}
      showDeleteButton={toolTipVisibility[restProps.appointmentData.id]}
      {...restProps}
    />
  );
};

export const Appointment = ({ children, style, data, ...restProps }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.calendar.currentUser);
  if (currentUser === data.user) {
    dispatch(changeVisibility({ id: data.id, bool: true }));
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          backgroundColor: '#4299E1',
          borderRadius: '5px',
        }}
        data={data}
      >
        {children}
      </Appointments.Appointment>
    );
  } else {
    dispatch(changeVisibility({ id: data.id, bool: false }));
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          backgroundColor: '#F56565',
          borderRadius: '8px',
        }}
        data={data}
      >
        {children}
      </Appointments.Appointment>
    );
  }
};
