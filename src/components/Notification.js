import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function Notification(props) {
  return (
    <Snackbar 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={props.openMessage} 
      autoHideDuration={3500} 
      onClose={props.handleCloseMessage}
    >
      <Alert severity={props.type} sx={{ width: '85%' }} onClose={props.handleCloseMessage}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}