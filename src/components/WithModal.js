import { Dialog, DialogTitle, DialogContent } from "@mui/material";


export default function WithModal(WrappedComponent) {
  return (props) => {

    const {type, open, onClose, modalContent, title} = props;
    
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <WrappedComponent type={type} data={modalContent} onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  }
}