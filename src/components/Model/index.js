import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import { useEffect } from "react";
import MultiSelectEmployees from "components/MultiSelect/MultiSelectEmployees";
import MultipleSelectProject from "components/MultiSelect/MultipleSelectProjects";
import { Task } from "@mui/icons-material";

export default function AddTask({ Open, handleClickOpen, Edit, Task }) {
  const [open, setOpen] = React.useState(false);
  // const [edit, setEdit] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   alert("closed");
  // };

  useEffect(() => {
    setOpen(Open);
    // setEdit(Edit);
  }, [Open, Edit, Task]);

  return (
    <div>
      {/*
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      {/* <MDButton onClick={handleClickOpen} variant="gradient">
        Add New Task
      </MDButton>
      <Dialog open={open} onClose={handleClose}> */}
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle style={{ width: "500px" }}>
          {Edit === true ? "Edit" : "Create New "} Task {console.log("Edit", Edit)}
        </DialogTitle>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <DialogContentText>Task Title</DialogContentText>
              <MDInput type="text" fullWidth value={Task?.values?.task_title} />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Projects</DialogContentText>
              {/* <MDInput placeholder="Project" type="text" fullWidth /> */}
              {Edit === true ? (
                <MDInput type="text" fullWidth value={Task?.values?.project_title} disabled />
              ) : (
                <MultipleSelectProject />
              )}
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Task Description</DialogContentText>
              <MDInput placeholder="Task Description" type="text" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Employees</DialogContentText>
              <MultiSelectEmployees />
              {/* <MDInput placeholder="Select Employees" type="text" fullWidth /> */}
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Date and time</DialogContentText>
              <MDInput placeholder="Select date and time" type="date" fullWidth />
            </MDBox>
          </MDBox>
        </MDBox>

        <DialogContent>
          <DialogContentText></DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
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
