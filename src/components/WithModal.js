import { Box, Typography, Modal } from "@mui/material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function WithModal(WrappedComponent) {
  return (props) => {

    const {type, open, onClose, modalContent, title} = props;
    
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>

          <WrappedComponent type={type} data={modalContent} onClose={onClose} />
        </Box>
      </Modal>
    );
  }
}