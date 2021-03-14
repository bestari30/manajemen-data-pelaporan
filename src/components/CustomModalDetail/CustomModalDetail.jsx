import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, IconButton, Box, Divider } from "@material-ui/core";
import { Visibility, Clear } from "@material-ui/icons";

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #c2c2a3",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: "auto",
    maxHeight: "600px",
  },
}));

export const CustomModalDetail = ({ handleInitialData, children }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <h2>Detail</h2>
        <IconButton
          onClick={() => {
            handleClose();
          }}
          variant="contained"
        >
          <Clear />
        </IconButton>
      </Box>

      <Divider />
      <br />
      {children}
      <Divider />
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={() => {
          handleInitialData();
          handleOpen();
        }}
        size="small"
      >
        <Visibility style={{ color: "#206040" }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default CustomModalDetail;
