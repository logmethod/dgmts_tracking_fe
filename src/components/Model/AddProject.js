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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import MultiSelectEmployees from "components/MultiSelect/MultiSelectEmployees";
import MultipleSelectProject from "components/MultiSelect/MultipleSelectProjects";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "redux/reducers/user";
import { createProject, updateProject } from "redux/reducers/projects";
import { projectSelector as testProject } from "redux/reducers/projects";
import { clearState } from "redux/reducers/projects";
import { getProjects } from "redux/reducers/projects";

export default function AddProject({ Open, handleClickOpen, Edit, Project }) {
  const [open, setOpen] = React.useState(false);
  const [selectedManager, setSelectedManager] = React.useState("");

  const token = localStorage.getItem("token");
  const values = Project && Project?.values;
  const [formData, setFormData] = React.useState({});

  const dispatch = useDispatch();
  let { title, description, site_location, user_id, site_contact, site_address } = formData;
  let { isSuccess, errorMessage, isError, successMessage, isFetching } = useSelector(testProject);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForm = () => {
    user_id = selectedManager[0];
    const projectData = {
      title,
      project_id: Project && values.id,
      description,
      site_location,
      user_id,
      site_contact,
      site_address,
      token,
    };

    if (Edit) {
      dispatch(updateProject(projectData));
    } else {
      dispatch(createProject(projectData));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      notify(successMessage);
      dispatch(getProjects({ token }));
      handleClickOpen();
      dispatch(clearState());
    }
    if (isError) {
      notify(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);
  const handleSubmit = () => {
    handleForm();
  };
  useEffect(() => {
    setOpen(Open);
    setFormData({
      title: Project ? values?.title : "",
      project_id: Project ? values?.id : "",
      description: Project ? values?.description : "",
      site_location: {
        lat: 29.2131,
        lng: -29.12312,
      },
      site_contact: Project ? values?.site_contact : "",
      site_address: Project ? values?.site_address : "",
    });
  }, [Open, Edit, Project]);

  const notify = (message) => toast(message);
  return (
    <div>
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle style={{ width: "500px" }}>
          {Edit === true ? "EDIT " : "Create New"} Project
        </DialogTitle>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <DialogContentText>Project Title</DialogContentText>
              <MDInput type="text" name="title" value={title} onChange={onChange} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Description</DialogContentText>
              <MDInput
                type="text"
                name="description"
                value={description}
                onChange={onChange}
                fullWidth
              />
            </MDBox>
            {!Edit && (
              <div>
                <GooglePlacesAutocomplete apiKey="AIzaSyBpI4lcmxMKdnkrrRlZUF-eQanA2ZSDZVI" />
              </div>
            )}
            {!Edit && (
              <MDBox mb={2}>
                <DialogContentText>Project Manager</DialogContentText>

                <MultiSelectEmployees setManager={setSelectedManager} />
              </MDBox>
            )}
            <MDBox mb={2}>
              <DialogContentText>Site Contact</DialogContentText>
              <MDInput
                type="text"
                name="site_contact"
                value={site_contact}
                onChange={onChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <DialogContentText>Site Address</DialogContentText>
              <MDInput
                type="text"
                name="site_address"
                value={site_address}
                onChange={onChange}
                fullWidth
              />
            </MDBox>
          </MDBox>
        </MDBox>
        <DialogActions>
          <MDButton
            variant="gradient"
            color="info"
            disabled={isFetching}
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
