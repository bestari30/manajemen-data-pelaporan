import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, IconButton, Button, Box, Divider } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #c2c2a3",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const CustomModalDelete = ({ handleDelete }) => {
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
      <h2>Apa anda yakin?</h2>
      <Divider />
      <Box
        mt={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button onClick={handleClose} variant="contained" color="default">
          Tidak
        </Button>
        <Button
          onClick={() => {
            handleDelete();
            handleClose();
          }}
          variant="contained"
          color="secondary"
          style={{ backgroundColor: "#e63900" }}
        >
          Ya
        </Button>
      </Box>
    </div>
  );

  return (
    <div>
      <IconButton color="secondary" onClick={handleOpen} size="small">
        <Delete style={{ color: "#e63900" }} />
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

export default CustomModalDelete;
