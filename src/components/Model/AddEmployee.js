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
import { useDispatch, useSelector } from "react-redux";
import { creatEmployee } from "redux/reducers/employee";
import { userSelector } from "../../redux/reducers/user";
import { updateEmployee } from "redux/reducers/employee";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { employeeSelector } from "redux/reducers/employee";
import { clearState } from "redux/reducers/employee";
import { getEmployees } from "redux/reducers/employee";

export default function AddEmployee({ Open, handleClickOpen, Edit, Employee }) {
  const [open, setOpen] = React.useState(false);
  const [roleFromchild, setRoleFromchild] = React.useState("");
  const token = localStorage.getItem("token");
  const values = Employee && Employee?.values;
  const [formData, setFormData] = React.useState({});

  // console.log("test", handleClickOpen());

  const dispatch = useDispatch();

  let { successMessage, isSuccess, isError, errorMessage, isFetching } =
    useSelector(employeeSelector);
  useEffect(() => {
    setOpen(Open);
    setFormData({
      name: Employee ? values?.name : "",
      email: Employee ? values?.email : "",
      user_id: Employee ? values?.id : "",
      password: "",
      role: Employee ? values?.role : roleFromchild[0],
      contact: Employee ? values?.contact : "",
    });
  }, [Open, Edit, Employee]);
  let { name, email, password, role, contact, user_id } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForm = async () => {
    role = roleFromchild[0];
    const employeeData = { name, email, password, role, contact, token, user_id };
    if (Edit) {
      await dispatch(updateEmployee(employeeData));
    } else {
      dispatch(creatEmployee(employeeData));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      //instead of this the notify component call from userEdit modal component
      // notify(successMessage);
      dispatch(getEmployees({ token }));
      handleClickOpen();
      dispatch(clearState());
    }
    if (isError) {
      // notify(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);
  const notify = (message) => toast(message);
  const handleSubmit = () => {
    handleForm();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle style={{ width: "500px" }}>
          {Edit ? "Edit " : "Create New"} Employee
        </DialogTitle>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <DialogContentText>Name</DialogContentText>
              <MDInput type="text" name="name" value={name} onChange={onChange} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Email</DialogContentText>
              <MDInput type="Email" name="email" value={email} onChange={onChange} fullWidth />
            </MDBox>
            {!Edit && (
              <MDBox mb={2}>
                <DialogContentText>Password</DialogContentText>
                <MDInput
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  fullWidth
                />
              </MDBox>
            )}

            <MDBox mb={2}>
              <DialogContentText>Role</DialogContentText>
              {/* <MDInput placeholder="Select Project Manager" type="text" fullWidth /> */}
              <SingleRoleSelect changeRole={setRoleFromchild} selected />
            </MDBox>

            <MDBox mb={2}>
              <DialogContentText>Contact</DialogContentText>
              <MDInput
                placeholder="Contact"
                type="number"
                name="contact"
                onChange={onChange}
                value={contact}
                fullWidth
              />
            </MDBox>
          </MDBox>
        </MDBox>

        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          {/* <Button onClick={handleClose}>Create Task</Button> */}
          <MDButton
            variant="gradient"
            disabled={isFetching}
            color="info"
            onClick={handleSubmit}
            fullWidth
          >
            {Edit ? "Update " : "Create"}
          </MDButton>
        </DialogActions>
        <ToastContainer />
      </Dialog>
    </div>
  );
}
