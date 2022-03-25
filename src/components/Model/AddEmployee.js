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
import MultiSelectEmployee from "components/MultiSelect/MultiSelectEmployees";
import MultipleSelectProject from "components/MultiSelect/MultipleSelectProjects";
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
              <DialogContentText>Task Title</DialogContentText>
              <MDInput type="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Project</DialogContentText>
              <MDInput placeholder="Password" type="password" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Project Manager</DialogContentText>
              {/* <MDInput placeholder="Select Project Manager" type="text" fullWidth /> */}
              <MultipleSelectProject />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Employees</DialogContentText>
              {/* <MDInput placeholder="Select Employees" type="text" fullWidth /> */}
              <MultiSelectEmployee />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Date and time</DialogContentText>
              <MDInput placeholder="Select date and time" type="text" fullWidth />
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
