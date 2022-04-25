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
import { makeStyles } from "@mui/styles";
import MultiSelectEmployees from "components/MultiSelect/MultiSelectEmployees";
import MultipleSelectProject from "components/MultiSelect/MultipleSelectProjects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Task } from "@mui/icons-material";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getProjects, projectSelector } from "redux/reducers/projects";
import { employeeSelector } from "redux/reducers/employee";
import { creatTask } from "redux/reducers/tasks";
import { tasksSelector, clearState, updateTask } from "redux/reducers/tasks";

const useStyles = makeStyles({
  dropdown: {
    height: 42,
  },
});

export default function AddTask({ Open, handleClickOpen, Edit, Task }) {
  const [open, setOpen] = React.useState(false);
  const values = Task && Task?.values;
  const [formData, setFormData] = React.useState({});

  const dispatch = useDispatch();
  const { employee } = useSelector(employeeSelector);
  const { projects } = useSelector(projectSelector);
  const token = localStorage.getItem("token");
  const { successMessage, isSuccess, isFetching } = useSelector(tasksSelector);
  const { title, project_id, description, start_date, assigned_to, status, task_id } = formData;
  const classes = useStyles();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForm = () => {
    const taskData = {
      title,
      project_id,
      description,
      start_date,
      assigned_to,
      status,
      task_id,
      token,
    };

    if (Edit) {
      dispatch(updateTask(taskData));
    } else {
      dispatch(creatTask(taskData));
    }
  };

  var employeExloadAdmin = employee.filter((el) => el.role != "ADMIN");

  // useEffect(() => {
  //   alert("isSuccess", isSuccess);
  //   if (isSuccess) {
  //     notify();
  //     handleClickOpen();
  //     setTimeout(() => {
  //       dispatch(clearState());
  //     }, 3000);
  //   }
  // }, [isSuccess]);

  const handleSubmit = () => {
    handleForm();
  };
  useEffect(() => {
    setOpen(Open);
    setFormData({
      title: values ? values?.task_title : "",
      project_id: "",
      description: values ? values?.task_description : "",
      start_date: values ? values?.start_date : "",
      assigned_to: values ? values?.project_manager : "",
      status: "PENDING",
      task_id: values ? values?.task_id : "",
    });
  }, [Open, Edit, Task]);

  const notify = () => toast.success(successMessage);
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
          {Edit === true ? "Edit" : "Create New "} Task
        </DialogTitle>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <DialogContentText>Task Title</DialogContentText>
              <MDInput type="text" fullWidth name="title" value={title} onChange={onChange} />
            </MDBox>
            {Edit === false && (
              <>
                <DialogContentText>Projects</DialogContentText>
                {/* <FormControl fullWidth > */}
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={project_id}
                  name="project_id"
                  onChange={onChange}
                  fullWidth
                  className={classes.dropdown}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.title}
                    </MenuItem>
                  ))}
                </Select>
                {/* </FormControl> */}
              </>
            )}
            <MDBox mb={2}>
              <DialogContentText>Task Description</DialogContentText>
              <MDInput
                placeholder="Task Description"
                type="text"
                name="description"
                value={description}
                onChange={onChange}
                fullWidth
              />
            </MDBox>
            {Edit === false && (
              <>
                <DialogContentText>Employees</DialogContentText>

                <Select
                  labelId="assigned_to-select-label"
                  id="assigned_to-select"
                  value={assigned_to}
                  // label="assigned_to"
                  name="assigned_to"
                  onChange={onChange}
                  fullWidth
                  className={classes.dropdown}
                >
                  {employeExloadAdmin.map((employeExloadAdmin) => (
                    <MenuItem key={employeExloadAdmin.id} value={employeExloadAdmin.id}>
                      {employeExloadAdmin.name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            <MDBox mb={2}>
              <DialogContentText>Date and time</DialogContentText>
              <MDInput
                placeholder="Select date and time"
                type="date"
                name="start_date"
                value={start_date}
                onChange={onChange}
                fullWidth
              />
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
          <MDButton
            variant="gradient"
            color="info"
            disabled={isFetching}
            fullWidth
            onClick={handleSubmit}
          >
            {Edit ? "Update " : "Create"}
          </MDButton>
        </DialogActions>
        <ToastContainer />
      </Dialog>
    </div>
  );
}
