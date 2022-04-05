import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import { useEffect } from "react";
import SingleRoleSelect from "components/SingleSelect/SingleRoleSelect";
export default function AddEmployee({ Open, handleClickOpen }) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(Open);
  }, [Open]);

  return (
    <div>
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle style={{ width: "500px" }}>Create New Employee</DialogTitle>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <DialogContentText>Name</DialogContentText>
              <MDInput type="text" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Email</DialogContentText>
              <MDInput type="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Password</DialogContentText>
              <MDInput placeholder="Password" type="password" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Role</DialogContentText>
              {/* <MDInput placeholder="Select Project Manager" type="text" fullWidth /> */}
              <SingleRoleSelect />
            </MDBox>

            <MDBox mb={2}>
              <DialogContentText>Contact</DialogContentText>
              <MDInput placeholder="Contact" type="number" fullWidth />
            </MDBox>
          </MDBox>
        </MDBox>

        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          {/* <Button onClick={handleClose}>Create Task</Button> */}
          <MDButton variant="gradient" color="info" fullWidth>
            Create
          </MDButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
