import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SingleRoleSelect from "components/SingleSelect/SingleRoleSelect";
import { useDispatch } from "react-redux";
import { changePassword } from "redux/reducers/employee";
import { changeRole } from "redux/reducers/employee";
import { getEmployees } from "redux/reducers/employee";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { makeStyles } from "@mui/styles";

import { DataGrid } from "@mui/x-data-grid";
import ReportsTable from "components/Reports/ReportsTable";

const useStyles = makeStyles(() => ({
  paper: { minWidth: "100px" },
}));

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
export default function PasswordEdit({ state, data, type, handleClose }) {
  const value = data ? data.values : "";
  const [roleFromchild, setRoleFromchild] = React.useState("");
  const [password, setPassword] = React.useState("");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const email = value?.email;
  const role = roleFromchild[0];
  const user_id = value?.id;
  const classes = useStyles();
  const handleForm = () => {
    const formData = { password, email, role, user_id, token };

    type === "Change Password" && dispatch(changePassword(formData));
    type === "Edit Role" && dispatch(changeRole(formData));
    dispatch(getEmployees({ token }));
    handleClose();
  };

  return (
    <Dialog open={state} onClose={handleClose} classes={{ paper: classes.paper }}>
      <DialogTitle>{type}</DialogTitle>
      <DialogContent style={{ overflowX: "hidden" }}>
        {type === "Edit Role" && (
          <SingleRoleSelect changeRole={setRoleFromchild} selected fullWidth />
        )}
        {type === "View Reports" && <ReportsTable data={value} />}
        {type === "Change Password" && (
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        {type !== "View Reports" && <Button onClick={handleForm}>Submite</Button>}
      </DialogActions>
    </Dialog>
  );
}
